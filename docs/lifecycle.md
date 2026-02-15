# Provider Lifecycle

Pict providers participate in several lifecycle phases. Each phase has synchronous and asynchronous variants, and the base class provides no-op defaults you override as needed.

## Initialization

Initialization runs once per provider lifetime. Calling `initialize()` or `initializeAsync()` a second time logs a warning and returns without re-running.

### Sync Flow

```
initialize()
  ├── onBeforeInitialize()
  ├── onInitialize()
  └── onAfterInitialize()
```

### Async Flow

```
initializeAsync(fCallback)
  ├── onBeforeInitializeAsync(fCallback)
  ├── onInitializeAsync(fCallback)
  └── onAfterInitializeAsync(fCallback)
```

The async flow uses the `Anticipate` service to run the three phases in series, waiting for each callback before proceeding.

### When Initialization Runs

With `AutoInitialize: true` (the default), the Pict application calls `initializeAsync()` during its own initialization. Providers are initialized in order of their `AutoInitializeOrdinal` value (lower values first, default `0`).

If a provider is added after the app has already initialized, it is initialized immediately upon registration.

### Example

```javascript
class InventoryProvider extends libPictProvider
{
	onBeforeInitialize()
	{
		// Set up local state before the main init logic
		this._cache = {};
		return true;
	}

	onInitialize()
	{
		// Register templates, load config, prepare data structures
		this.pict.TemplateProvider.addDefaultTemplate('', '-InventoryRow',
			'<tr><td>{~Data:Record.SKU~}</td><td>{~Data:Record.Quantity~}</td></tr>',
			'InventoryProvider');
		return true;
	}

	onAfterInitialize()
	{
		this.log.info('Inventory provider ready');
		return true;
	}
}
```

## Data Loading

The data load cycle is always asynchronous. It runs when the Pict application's `loadData()` or `loadDataAsync()` method is called. Providers with `AutoLoadDataWithApp: true` (the default) participate automatically.

### Flow

```
onBeforeLoadDataAsync(fCallback)
  │
onLoadDataAsync(fCallback)
  │
onAfterLoadDataAsync(fCallback)
```

### Example

```javascript
class CustomerProvider extends libPictProvider
{
	onBeforeLoadDataAsync(fCallback)
	{
		// Clear stale data before loading
		this.AppData.Customers = [];
		return fCallback();
	}

	onLoadDataAsync(fCallback)
	{
		this.pict.CSP.getJSON('/api/customers',
			(pError, pResponse, pBody) =>
			{
				if (!pError)
				{
					this.AppData.Customers = pBody;
				}
				return fCallback(pError);
			});
	}

	onAfterLoadDataAsync(fCallback)
	{
		this.log.info(`Loaded ${this.AppData.Customers.length} customers`);
		return fCallback();
	}
}
```

## Solving

The solve cycle processes loaded data — computing derived values, aggregating totals, validating state. Providers with `AutoSolveWithApp: true` (the default) participate when the Pict application solves.

### Sync Flow

```
solve()
  └── onPreSolve()
```

### Async Flow

```
solveAsync(fCallback)
  └── onPreSolveAsync(fCallback)
```

Providers are solved in order of their `AutoSolveOrdinal` value. This lets you ensure that one provider's calculations complete before another begins.

### Example

```javascript
class TotalsProvider extends libPictProvider
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, Object.assign({ AutoSolveOrdinal: 10 }, pOptions), pServiceHash);
	}

	solve()
	{
		let tmpOrders = this.AppData.Orders || [];
		this.AppData.OrderTotal = tmpOrders.reduce(
			(pSum, pOrder) => pSum + pOrder.Amount, 0);
		this.lastSolvedTimestamp = this.pict.log.getTimeStamp();
		return true;
	}
}
```

## Rendering

Providers have render hooks, though rendering is more commonly handled by Pict views. Use provider render hooks when a provider needs to trigger view updates or coordinate rendering logic.

### Sync Flow

```
render()
  └── onPreRender()
```

### Async Flow

```
renderAsync(fCallback)
  └── onPreRenderAsync(fCallback)
```

## Data Saving

The save cycle mirrors the load cycle. It runs when the Pict application's save methods are called.

### Flow

```
onBeforeSaveDataAsync(fCallback)
  │
onSaveDataAsync(fCallback)
  │
onAfterSaveDataAsync(fCallback)
```

### Example

```javascript
class CustomerProvider extends libPictProvider
{
	onSaveDataAsync(fCallback)
	{
		this.pict.CSP.postJSON('/api/customers',
			{ Customers: this.AppData.Customers },
			(pError) =>
			{
				return fCallback(pError);
			});
	}
}
```

## Lifecycle Summary

| Phase | Methods | When It Runs | Auto Option |
|-------|---------|-------------|-------------|
| **Initialize** | `onBeforeInitialize`, `onInitialize`, `onAfterInitialize` | App init or provider registration | `AutoInitialize` |
| **Load Data** | `onBeforeLoadDataAsync`, `onLoadDataAsync`, `onAfterLoadDataAsync` | App data load | `AutoLoadDataWithApp` |
| **Solve** | `onPreSolve`, `solve` | App solve cycle | `AutoSolveWithApp` |
| **Render** | `onPreRender`, `render` | Explicitly called | — |
| **Save Data** | `onBeforeSaveDataAsync`, `onSaveDataAsync`, `onAfterSaveDataAsync` | App data save | — |

## Ordinals

Both initialization and solving support ordinal-based ordering:

```javascript
// This provider initializes first (ordinal 0)
tmpPict.addProvider('ConfigProvider', { AutoInitializeOrdinal: 0 }, ConfigProvider);

// This provider initializes second (ordinal 10)
tmpPict.addProvider('DataProvider', { AutoInitializeOrdinal: 10 }, DataProvider);

// This provider solves last (ordinal 100)
tmpPict.addProvider('SummaryProvider', { AutoSolveOrdinal: 100 }, SummaryProvider);
```

Lower ordinal values run first. Providers with the same ordinal run in registration order.
