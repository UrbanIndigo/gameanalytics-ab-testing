# Game Analytics AB Service

This library is an A/B testing wrapper over the existing Game Analytics library, providing typing support and default values.

## Quick Start

To get started with the Game Analytics AB Service, you must initialise GameAnalytics the usual way, and then construct a new GameAnalyticsABService.

```ts
GameAnalytics.initialize({
	gameKey: "GAME-KEY",
	secretKey: "SECRET-KEY",
	build: "1.0.0",
});

new GameAnalyticsABService<"music" | "ad-location">(
	{
		music: "Bossa Me (a)",
		"ad-location": "top-left",
	},
	(player, values) => {
		// do something with the loaded values
	},
);
```

## 📦 Installation

[Take me to the NPM package →](https://www.npmjs.com/package/@rbxts/gameanalytics-ab-service)

```bash
npm install @rbxts/gameanalytics-ab-service
```

## 🪪 License

gameanalytics-ab-service is available under the MIT license. See the [LICENSE.md](LICENSE.md) file for more info.
