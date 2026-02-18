# Pict Provider

The base class for Pict data providers. Extends [fable-serviceproviderbase](https://github.com/stevenvelozo/fable-serviceproviderbase) with lifecycle hooks for initialization, rendering, solving, and data loading, giving providers access to Pict's application state, logging, and template engine.

[![Build Status](https://github.com/stevenvelozo/pict-provider/workflows/Pict-Provider/badge.svg)](https://github.com/stevenvelozo/pict-provider/actions)
[![npm version](https://badge.fury.io/js/pict-provider.svg)](https://badge.fury.io/js/pict-provider)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Features

- **Service Provider Pattern** - Registers with a Pict instance via dependency injection, gaining access to logging, configuration, and other services
- **Lifecycle Hooks** - Override `onInitialize`, `onPreRender`, `onPreSolve`, `onLoadDataAsync`, and `onSaveDataAsync` to add custom behavior at each stage
- **Sync and Async** - Every lifecycle method has both synchronous and async (callback-based) variants
- **Auto-Initialize** - Providers can initialize automatically when the Pict application starts, with configurable ordinal for ordering
- **Auto-Solve** - Providers can participate in the application solve cycle automatically
- **Template Registration** - Declare default templates in the provider options and they are registered with the Pict template engine on construction
- **TypeScript Definitions** - Ships with `.d.ts` type definitions
- **AppData Access** - Direct access to `this.AppData` and `this.Bundle` for shared application state

## Installation

```bash
npm install pict-provider
```

## Quick Start

```javascript
const libPictProvider = require('pict-provider');

class WeatherProvider extends libPictProvider
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		this.serviceType = 'WeatherProvider';
	}

	onInitialize()
	{
		this.log.info('WeatherProvider initialized');
		return true;
	}

	onLoadDataAsync(fCallback)
	{
		// Fetch weather data and store it in AppData
		this.AppData.Weather = { temperature: 72, condition: 'Sunny' };
		return fCallback();
	}
}

// Register with a Pict instance
let _Pict = new (require('pict'))();
let _Weather = _Pict.addProvider('Weather', {}, WeatherProvider);
_Weather.initialize();
```

## Lifecycle

Providers participate in the Pict application lifecycle through hookable methods. Each phase has three stages (before, main, after) and both sync and async variants.

### Initialization

Called once when the provider is initialized, either manually or automatically when the application starts.

| Method | Async Variant | Description |
|--------|---------------|-------------|
| `onBeforeInitialize()` | `onBeforeInitializeAsync(fCallback)` | Pre-initialization setup |
| `onInitialize()` | `onInitializeAsync(fCallback)` | Main initialization logic |
| `onAfterInitialize()` | `onAfterInitializeAsync(fCallback)` | Post-initialization cleanup |

```javascript
onInitializeAsync(fCallback)
{
	this.log.info('Loading configuration...');
	// Perform async setup
	return fCallback();
}
```

### Rendering

Called when the provider's render cycle is triggered.

| Method | Async Variant | Description |
|--------|---------------|-------------|
| `onPreRender()` | `onPreRenderAsync(fCallback)` | Pre-render logic |
| `render()` | `renderAsync(fCallback)` | Trigger the render cycle |

### Solving

Called during the application solve cycle, used for computing derived state.

| Method | Async Variant | Description |
|--------|---------------|-------------|
| `onPreSolve()` | `onPreSolveAsync(fCallback)` | Pre-solve logic |
| `solve()` | `solveAsync(fCallback)` | Trigger the solve cycle |

### Data Loading

Called during the application data load phase.

| Method | Description |
|--------|-------------|
| `onBeforeLoadDataAsync(fCallback)` | Pre-load hook |
| `onLoadDataAsync(fCallback)` | Main data loading logic |
| `onAfterLoadDataAsync(fCallback)` | Post-load hook |

### Data Saving

Called during the application data save phase.

| Method | Description |
|--------|-------------|
| `onBeforeSaveDataAsync(fCallback)` | Pre-save hook |
| `onSaveDataAsync(fCallback)` | Main data saving logic |
| `onAfterSaveDataAsync(fCallback)` | Post-save hook |

## Configuration

Pass options when registering the provider:

```javascript
let _Provider = _Pict.addProvider('MyProvider',
{
	ProviderIdentifier: 'MyProvider',

	AutoInitialize: true,
	AutoInitializeOrdinal: 0,

	AutoLoadDataWithApp: true,

	AutoSolveWithApp: true,
	AutoSolveOrdinal: 0,

	Manifests: {},

	Templates:
	[
		{
			Prefix: 'MyPrefix',
			Postfix: '-MyTemplate',
			Template: '<div>{~Data:Record.Name~}</div>'
		}
	]
}, MyProviderClass);
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ProviderIdentifier` | `String` | Auto-generated UUID | Human-readable identifier for logging |
| `AutoInitialize` | `Boolean` | `true` | Initialize automatically when the app starts |
| `AutoInitializeOrdinal` | `Number` | `0` | Initialization order (lower runs first) |
| `AutoLoadDataWithApp` | `Boolean` | `true` | Participate in the app data load cycle |
| `AutoSolveWithApp` | `Boolean` | `true` | Participate in the app solve cycle |
| `AutoSolveOrdinal` | `Number` | `0` | Solve order (lower runs first) |
| `Manifests` | `Object` | `{}` | Manifest definitions for the provider |
| `Templates` | `Array` | `[]` | Default templates to register on construction |

## Properties

Every provider instance has access to these properties:

| Property | Type | Description |
|----------|------|-------------|
| `this.pict` | `Pict` | The Pict instance (same as `this.fable`) |
| `this.AppData` | `Object` | Shared application state |
| `this.Bundle` | `Object` | Application bundle data |
| `this.log` | `Object` | Logger instance |
| `this.options` | `Object` | Merged configuration options |
| `this.UUID` | `String` | Unique identifier for this provider instance |
| `this.Hash` | `String` | Service hash for registry lookup |
| `this.initializeTimestamp` | `Number\|false` | Timestamp of initialization, or `false` if not yet initialized |
| `this.lastSolvedTimestamp` | `Number\|false` | Timestamp of last solve, or `false` if not yet solved |

## Part of the Retold Framework

Pict Provider is the base class used throughout the Pict ecosystem:

- [pict](https://github.com/stevenvelozo/pict) - UI framework
- [pict-view](https://github.com/stevenvelozo/pict-view) - View base class (extends PictProvider)
- [pict-template](https://github.com/stevenvelozo/pict-template) - Template engine
- [fable](https://github.com/stevenvelozo/fable) - Application services framework
- [fable-serviceproviderbase](https://github.com/stevenvelozo/fable-serviceproviderbase) - Service provider base class

## Testing

Run the test suite:

```bash
npm test
```

Run with coverage:

```bash
npm run coverage
```

## Related Packages

- [pict](https://github.com/stevenvelozo/pict) - MVC application framework
- [pict-view](https://github.com/stevenvelozo/pict-view) - View base class
- [fable](https://github.com/stevenvelozo/fable) - Application services framework

## License

MIT

## Contributing

Pull requests are welcome. For details on our code of conduct, contribution process, and testing requirements, see the [Retold Contributing Guide](https://github.com/stevenvelozo/retold/blob/main/docs/contributing.md).
