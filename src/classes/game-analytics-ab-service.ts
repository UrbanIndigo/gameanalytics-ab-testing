import { GameAnalytics } from "@rbxts/gameanalytics";

const Players = game.GetService("Players");
const RunService = game.GetService("RunService");

export class GameAnalyticsABService<Test extends string> {
	private maid: RBXScriptConnection[] = [];

	private cache = new Map<
		Player,
		{
			[key: string]: string;
		}
	>();

	private connections = new Map<Player, RBXScriptConnection>();

	/**
	 * Constructs an instance of the GameAnalyticsABService class.
	 *
	 * @param gameKey - The game key for GameAnalytics.
	 * @param secretKey - The secret key for GameAnalytics.
	 * @param build - The build version of the game.
	 * @param defaults - A record of default test values.
	 * @param onUpdate - A callback function that is called when a player's test value is updated.
	 */
	constructor(
		readonly gameKey: string,
		readonly secretKey: string,
		readonly build: string,
		private readonly defaults: Record<Test, string>,
		private readonly onUpdate: (player: Player, key: Test, value: string) => void,
	) {
		GameAnalytics.initialize({
			gameKey,
			secretKey,
			build,
		});

		for (const player of Players.GetPlayers()) {
			task.defer(() => this.onPlayerAdded(player));
		}

		this.maid.push(Players.PlayerAdded.Connect((player) => this.onPlayerAdded(player)));
		this.maid.push(Players.PlayerRemoving.Connect((player) => this.onPlayerRemoving(player)));
	}

	private onRemoteConfigReady(player: Player) {
		for (const [key, _] of pairs(this.defaults)) {
			this.set(player, key as Test, this.get(player, key as Test));
		}
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

	private set(player: Player, key: Test, value: string) {
		this.cache.set(player, {
			...this.cache.get(player),
			[key]: value,
		});

		this.onUpdate(player, key, value);
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
