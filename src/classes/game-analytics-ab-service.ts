import { GameAnalytics } from "@rbxts/gameanalytics";

const Players = game.GetService("Players");
const RunService = game.GetService("RunService");

export class GameAnalyticsABService<Test extends string> {
	private maid: RBXScriptConnection[] = [];

	private connections = new Map<Player, RBXScriptConnection>();

	/**
	 * Constructs an instance of the GameAnalyticsABService class. You must already have initialised GameAnalytics.
	 *
	 * @param defaults - A record of default test values.
	 * @param onLoaded - A callback function that is called when a player's test values are populated
	 */
	constructor(
		private readonly defaults: Record<Test, string>,
		private readonly onLoaded: (player: Player, values: { [T in Test]: string }) => void,
	) {
		for (const player of Players.GetPlayers()) {
			task.defer(() => this.onPlayerAdded(player));
		}

		this.maid.push(Players.PlayerAdded.Connect((player) => this.onPlayerAdded(player)));
		this.maid.push(Players.PlayerRemoving.Connect((player) => this.onPlayerRemoving(player)));
	}

	private onRemoteConfigReady(player: Player) {
		const results = {} as { [T in Test]: string };

		// eslint-disable-next-line roblox-ts/no-array-pairs
		for (const [key] of pairs(this.defaults)) {
			results[key as Test] = this.get(player, key as Test);
		}

		this.onLoaded(player, results);
	}

	private onPlayerAdded(player: Player) {
		if (player.Parent === undefined) {
			return;
		}

		let disconnected = false;

		const connection = RunService.Heartbeat.Connect(() => {
			if (disconnected) {
				return;
			}

			if (GameAnalytics.isPlayerReady(player.UserId) === true) {
				if (GameAnalytics.isRemoteConfigsReady(player.UserId) === true) {
					disconnected = true;
					connection.Disconnect();
					this.onRemoteConfigReady(player);
				}
			}
		});

		this.connections.set(player, connection);
	}

	private onPlayerRemoving(player: Player) {
		this.connections.delete(player);
	}

	private get(player: Player, key: Test) {
		const defaultValue = this.defaults[key]!;

		return (
			GameAnalytics.getRemoteConfigsValueAsString(player.UserId, {
				key,
				defaultValue,
			}) ?? defaultValue
		);
	}

	cleanup() {
		for (const connection of this.maid) {
			connection.Disconnect();
		}
	}
}
