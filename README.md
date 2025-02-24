# Game Analytics AB Service

This library is an A/B testing wrapper over the existing Game Analytics library, providing typing support and default values.

## Quick Start

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

<!-- [Take me to the NPM package →](https://www.npmjs.com/package/@rbxts/) -->

```bash
npm install @rbxts/gameanalytics-ab-service
```

## 🪪 License

gameanalytics-ab-service is available under the MIT license. See the [LICENSE.md](LICENSE.md) file for more info.
