type PlayerId = number | string;

export interface GameAnalyticsAB {
	/**
	 * Call this function to manually check if Remote Configs is ready (has been populated with values).
	 * @link https://docs.gameanalytics.com/integrations/sdk/roblox/game-ops#remote-configs
	 */
	isRemoteConfigsReady(playerId: PlayerId): boolean;

	/**
	 * If the specified key is not found in the Remote Configs it will return the default value either “normal” or “custom” default value.
	 * @link https://docs.gameanalytics.com/features/remote-configs
	 * @link https://docs.gameanalytics.com/integrations/sdk/roblox/game-ops#remote-configs
	 */
	getRemoteConfigsValueAsString(
		playerId: PlayerId,
		options: {
			key: string;
			defaultValue?: string;
		},
	): string | undefined;

	isPlayerReady(playerId: PlayerId): boolean;
}
