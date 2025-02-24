# Game Analytics AB Service

This library is an A/B testing wrapper over the existing Game Analytics library, providing typing support and default values.

## Quick Start

To get started with the Game Analytics AB Service, you can create a new instance of the service with your game key, API key, version, and default values for your A/B testing keys. Here's an example:

```ts
new GameAnalyticsABService<"music" | "ad-location">(
	"YOUR-GAME-KEY",
	"YOUR-API-KEY",
	"1.0.0",
	{
		music: "Bossa Me (a)",
		"ad-location": "top-left",
	},
	(player, key, value) => {
		// do something with the new key and value
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
