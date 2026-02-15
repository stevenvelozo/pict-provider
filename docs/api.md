# API Reference

## Class: PictProvider

Extends `fable-serviceproviderbase`. Service type: `'PictProvider'`.

### Constructor

```javascript
new PictProvider(pFable, pOptions, pServiceHash)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `pFable` | object | A Fable or Pict instance |
| `pOptions` | object | Configuration options (merged with defaults) |
| `pServiceHash` | string | Service identifier for the provider registry |

Default options are deep-merged with any provided options:

```javascript
{
	ProviderIdentifier: false,
	AutoInitialize: true,
	AutoInitializeOrdinal: 0,
	AutoLoadDataWithApp: true,
	AutoSolveWithApp: true,
	AutoSolveOrdinal: 0,
	Manifests: {},
	Templates: []
}
```

---

## Properties

### fable

Reference to the Fable instance. Provides access to logging, settings, UUID generation, and all registered services.

**Type:** `object`

---

### pict

Convenience alias for `fable`. Identical reference, named for clarity when working in Pict applications.

**Type:** `object`

---

### log

Logger instance from Fable. Supports `trace`, `debug`, `info`, `warn`, `error`, and `fatal` levels.

**Type:** `object`

---

### options

The merged configuration options for this provider instance.

**Type:** `object`

---

### UUID

Unique identifier assigned by the Fable service registry.

**Type:** `string`

---

### Hash

Service hash used to look up this provider in the registry.

**Type:** `string`

---

### AppData

Reference to the shared application data object (`pict.AppData`). All providers and views share this object.

**Type:** `object`

---

### Bundle

Reference to the shared bundle/resource object (`pict.Bundle`).

**Type:** `object`

---

### initializeTimestamp

Timestamp of when initialization completed. `false` if not yet initialized. Used as a guard to prevent double initialization.

**Type:** `string | false`

---

### lastSolvedTimestamp

Timestamp of the last solve operation. `false` if never solved.

**Type:** `string | false`

---

### _Package

Package metadata from `package.json`. Contains `name`, `version`, and other npm fields.

**Type:** `object`

---

## Initialization Methods

### initialize()

Run the synchronous initialization sequence. Guards against re-initialization — a second call logs a warning and returns `false`.

**Returns:** `boolean` — `true` if initialization ran, `false` if already initialized.

---

### initializeAsync(fCallback)

Run the asynchronous initialization sequence using the `Anticipate` service. Runs `onBeforeInitializeAsync`, `onInitializeAsync`, and `onAfterInitializeAsync` in series.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fCallback` | function | `(pError?)` called when complete |

---

### onBeforeInitialize()

Hook called before initialization. Override to set up local state.

**Returns:** `boolean`

---

### onBeforeInitializeAsync(fCallback)

Async version of `onBeforeInitialize`. Default calls the sync version and then the callback.

---

### onInitialize()

Main initialization hook. Override to register templates, load configuration, or prepare data structures.

**Returns:** `boolean`

---

### onInitializeAsync(fCallback)

Async version of `onInitialize`. Default calls the sync version and then the callback.

---

### onAfterInitialize()

Hook called after initialization. Override for post-init logging or validation.

**Returns:** `boolean`

---

### onAfterInitializeAsync(fCallback)

Async version of `onAfterInitialize`. Default calls the sync version and then the callback.

---

## Render Methods

### render()

Run the synchronous render sequence. Calls `onPreRender()`.

**Returns:** `boolean`

---

### renderAsync(fCallback)

Async render. Calls `onPreRender()` then the callback.

---

### onPreRender()

Hook called before rendering. Override for render preparation logic.

**Returns:** `boolean`

---

### onPreRenderAsync(fCallback)

Async version of `onPreRender`.

---

## Solve Methods

### solve()

Run the synchronous solve sequence. Calls `onPreSolve()`.

**Returns:** `boolean`

---

### solveAsync(fCallback)

Async solve. Calls `onPreSolve()` then the callback.

---

### onPreSolve()

Hook called before solving. Override for data computation and transformation logic.

**Returns:** `boolean`

---

### onPreSolveAsync(fCallback)

Async version of `onPreSolve`.

---

## Data Load Methods

### onBeforeLoadDataAsync(fCallback)

Hook called before data loading. Override to clear stale state or prepare for incoming data.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fCallback` | function | `(pError?)` called when complete |

---

### onLoadDataAsync(fCallback)

Main data loading hook. Override to fetch data from APIs, databases, or other sources.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fCallback` | function | `(pError?)` called when complete |

---

### onAfterLoadDataAsync(fCallback)

Hook called after data loading. Override for post-load validation or logging.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fCallback` | function | `(pError?)` called when complete |

---

## Data Save Methods

### onBeforeSaveDataAsync(fCallback)

Hook called before data saving. Override to validate or prepare data for persistence.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fCallback` | function | `(pError?)` called when complete |

---

### onSaveDataAsync(fCallback)

Main data saving hook. Override to persist data to APIs, databases, or local storage.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fCallback` | function | `(pError?)` called when complete |

---

### onAfterSaveDataAsync(fCallback)

Hook called after data saving. Override for post-save cleanup or confirmation.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fCallback` | function | `(pError?)` called when complete |

---

## Inherited from fable-serviceproviderbase

PictProvider inherits the full service provider interface. Key inherited members:

| Member | Description |
|--------|-------------|
| `serviceType` | Set to `'PictProvider'` |
| `fable` | The Fable dependency injection container |
| `log` | Logger service |
| `UUID` | Unique service identifier |
| `Hash` | Service registry hash |
| `options` | Merged configuration |
