# Pict Provider

The base class for data providers in Pict applications. Providers manage application data, register templates, and participate in the Pict application lifecycle. While views handle rendering to the DOM, providers handle everything else — loading data from APIs, transforming state, coordinating templates, and saving results.

## Quick Start

```bash
npm install pict-provider
```

### Creating a Provider

Extend `PictProvider` and override the lifecycle hooks you need:

```javascript
const libPictProvider = require('pict-provider');

class WeatherProvider extends libPictProvider
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onInitialize()
	{
		this.log.info('Weather provider initialized');
		return true;
	}

	onLoadDataAsync(fCallback)
	{
		// Fetch data and store it in shared application state
		this.pict.CSP.getJSON('https://api.weather.example.com/forecast',
			(pError, pResponse, pBody) =>
			{
				this.AppData.Weather = pBody;
				return fCallback(pError);
			});
	}

	solve()
	{
		// Transform loaded data for views to consume
		let tmpForecast = this.AppData.Weather;
		if (tmpForecast && tmpForecast.hourly)
		{
			this.AppData.WeatherSummary = {
				High: Math.max(...tmpForecast.hourly.map((h) => h.temp)),
				Low: Math.min(...tmpForecast.hourly.map((h) => h.temp))
			};
		}
		return true;
	}
}

module.exports = WeatherProvider;
```

### Registering with Pict

Add your provider to a Pict application instance:

```javascript
const libPict = require('pict');
const WeatherProvider = require('./WeatherProvider.js');

let tmpPict = new libPict();

// Register the provider
let tmpWeather = tmpPict.addProvider('WeatherProvider', {}, WeatherProvider);
```

With `AutoInitialize: true` (the default), the provider initializes when the app initializes. With `AutoLoadDataWithApp: true`, it participates in the app's data load cycle. With `AutoSolveWithApp: true`, its `solve()` method runs during the app's solve cycle.

## Configuration Options

Pass options as the second argument to `addProvider` or in the constructor:

```javascript
let tmpProvider = tmpPict.addProvider('MyProvider',
	{
		ProviderIdentifier: 'weather-main',
		AutoInitialize: true,
		AutoInitializeOrdinal: 0,
		AutoLoadDataWithApp: true,
		AutoSolveWithApp: true,
		AutoSolveOrdinal: 10,
		Templates:
		[
			{
				Prefix: '',
				Postfix: '-WeatherCard',
				Template: '<div class="card"><h2>{~Data:Record.City~}</h2></div>',
				Source: 'WeatherProvider'
			}
		]
	}, WeatherProvider);
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ProviderIdentifier` | string | auto-generated | A human-readable label for logging |
| `AutoInitialize` | boolean | `true` | Initialize when the app initializes |
| `AutoInitializeOrdinal` | number | `0` | Initialization order (lower runs first) |
| `AutoLoadDataWithApp` | boolean | `true` | Participate in the app's data load cycle |
| `AutoSolveWithApp` | boolean | `true` | Participate in the app's solve cycle |
| `AutoSolveOrdinal` | number | `0` | Solve order (lower runs first) |
| `Manifests` | object | `{}` | Manyfest definitions for data access |
| `Templates` | array | `[]` | Default templates to register at construction |

## Providers vs. Views

| Concern | Provider | View |
|---------|----------|------|
| Purpose | Data management and logic | DOM rendering |
| Lifecycle | init → load → solve → save | init → render → marshal |
| State | Reads and writes AppData | Reads AppData for display |
| Templates | Registers templates for views | Consumes templates for rendering |
| Base class | `pict-provider` | `pict-view` |

Providers and views share the same Fable/Pict instance and AppData. A typical pattern is for a provider to load data and solve calculations, then views read the results and render them to the DOM.

## Template Registration

Providers can register templates at construction time through the `Templates` option:

```javascript
{
	Templates:
	[
		{
			Prefix: '',
			Postfix: '-SummaryRow',
			Template: '<tr><td>{~Data:Record.Name~}</td><td>{~Data:Record.Total~}</td></tr>',
			Source: 'MyProvider'
		}
	]
}
```

Each template entry requires `Postfix` and `Template`. The `Prefix` defaults to empty string and `Source` is set automatically if omitted.

You can also register templates programmatically during initialization:

```javascript
onInitialize()
{
	this.pict.TemplateProvider.addDefaultTemplate('', '-DetailCard', '<div>...</div>', 'MyProvider');
	return true;
}
```

## Learn More

- [Lifecycle](lifecycle.md) -- Initialization, data load, solve, render, and save phases
- [API Reference](api.md) -- Complete method and property documentation
- [Pict Application](/pict/pict-application/) -- The application container that orchestrates providers
- [Pict View](/pict/pict-view/) -- The rendering counterpart to providers
- [Fable Service Base](/fable/fable-serviceproviderbase/) -- The parent class providers extend
