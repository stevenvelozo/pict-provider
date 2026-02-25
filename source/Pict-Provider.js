const libFableServiceBase = require('fable-serviceproviderbase');

const libPackage = require('../package.json');

const defaultPictProviderSettings = (
	{
		ProviderIdentifier: false,

		// If this is set to true, when the App initializes this will.
		// After the App initializes, initialize will be called as soon as it's added.
		AutoInitialize: true,
		AutoInitializeOrdinal: 0,

		AutoLoadDataWithApp: true,
		AutoLoadDataOrdinal: 0,

		AutoSolveWithApp: true,
		AutoSolveOrdinal: 0,

		Manifests: {},

		Templates: []
	});

class PictProvider extends libFableServiceBase
{
	/**
	 * @param {import('fable')} pFable - The Fable instance.
	 * @param {Record<string, any>} [pOptions] - The options for the provider.
	 * @param {string} [pServiceHash] - The service hash for the provider.
	 */
	constructor(pFable, pOptions, pServiceHash)
	{
		// Intersect default options, parent constructor, service information
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictProviderSettings)), pOptions);
		super(pFable, tmpOptions, pServiceHash);

		/** @type {import('fable') & import('pict') & { instantiateServiceProviderWithoutRegistration(pServiceType: string, pOptions?: Record<string, any>, pCustomServiceHash?: string): any }} */
		this.fable;
		/** @type {import('fable') & import('pict') & { instantiateServiceProviderWithoutRegistration(pServiceType: string, pOptions?: Record<string, any>, pCustomServiceHash?: string): any }} */
		this.pict;
		/** @type {any} */
		this.log;
		/** @type {Record<string, any>} */
		this.options;
		/** @type {string} */
		this.UUID;
		/** @type {string} */
		this.Hash;

		if (!this.options.ProviderIdentifier)
		{
			this.options.ProviderIdentifier = `AutoProviderID-${this.fable.getUUID()}`;
		}

		this.serviceType = 'PictProvider';
		/** @type {Record<string, any>} */
		this._Package = libPackage;

		// Convenience and consistency naming
		this.pict = this.fable;

		// Wire in the essential Pict application state
		/** @type {Record<string, any>} */
		this.AppData = this.pict.AppData;
		/** @type {Record<string, any>} */
		this.Bundle = this.pict.Bundle;

		this.initializeTimestamp = false;
		this.lastSolvedTimestamp = false;

		for (let i = 0; i < this.options.Templates.length; i++)
		{
			let tmpDefaultTemplate = this.options.Templates[i];

			if (!tmpDefaultTemplate.hasOwnProperty('Postfix') || !tmpDefaultTemplate.hasOwnProperty('Template'))
			{
				this.log.error(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} could not load Default Template ${i} in the options array.`, tmpDefaultTemplate);
			}
			else
			{
				if (!tmpDefaultTemplate.Source)
				{
					tmpDefaultTemplate.Source = `PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} options object.`;
				}
				this.pict.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix, tmpDefaultTemplate.Postfix, tmpDefaultTemplate.Template, tmpDefaultTemplate.Source);
			}
		}
	}

	/* -------------------------------------------------------------------------- */
	/*                        Code Section: Initialization                        */
	/* -------------------------------------------------------------------------- */
	onBeforeInitialize()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onBeforeInitialize:`);
		}
		return true;
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after pre-pinitialization.
	 *
	 * @return {void}
	 */
	onBeforeInitializeAsync(fCallback)
	{
		this.onBeforeInitialize();
		return fCallback();
	}

	onInitialize()
	{

		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onInitialize:`);
		}
		return true;
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
	 *
	 * @return {void}
	 */
	onInitializeAsync(fCallback)
	{
		this.onInitialize();
		return fCallback();
	}

	initialize()
	{
		if (this.pict.LogControlFlow)
		{
			this.log.trace(`PICT-ControlFlow PROVIDER [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} initialize:`);
		}

		if (!this.initializeTimestamp)
		{
			this.onBeforeInitialize();
			this.onInitialize();
			this.onAfterInitialize();
			this.initializeTimestamp = this.pict.log.getTimeStamp();
			return true;
		}
		else
		{
			this.log.warn(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} initialize called but initialization is already completed.  Aborting.`);
			return false;
		}
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
	 *
	 * @return {void}
	 */
	initializeAsync(fCallback)
	{
		if (this.pict.LogControlFlow)
		{
			this.log.trace(`PICT-ControlFlow PROVIDER [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} initializeAsync:`);
		}

		if (!this.initializeTimestamp)
		{
			let tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');

			if (this.pict.LogNoisiness > 0)
			{
				this.log.info(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} beginning initialization...`);
			}

			tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
			tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));
			tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));

			tmpAnticipate.wait(
				(pError) =>
				{
					this.initializeTimestamp = this.pict.log.getTimeStamp();
					if (pError)
					{
						this.log.error(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} initialization failed: ${pError.message || pError}`, { Stack: pError.stack });
					}
					else if (this.pict.LogNoisiness > 0)
					{
						this.log.info(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} initialization complete.`);
					}
					return fCallback();
				})
		}
		else
		{
			this.log.warn(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} async initialize called but initialization is already completed.  Aborting.`);
			// TODO: Should this be an error?
			return fCallback();
		}
	}

	onAfterInitialize()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onAfterInitialize:`);
		}
		return true;
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
	 *
	 * @return {void}
	 */
	onAfterInitializeAsync(fCallback)
	{
		this.onAfterInitialize();
		return fCallback();
	}

	onPreRender()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onPreRender:`);
		}
		return true;
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after pre-render.
	 *
	 * @return {void}
	 */
	onPreRenderAsync(fCallback)
	{
		this.onPreRender();
		return fCallback();
	}

	render()
	{
		return this.onPreRender();
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after render.
	 *
	 * @return {void}
	 */
	renderAsync(fCallback)
	{
		this.onPreRender();
		return fCallback();
	}

	onPreSolve()
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onPreSolve:`);
		}
		return true;
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after pre-solve.
	 *
	 * @return {void}
	 */
	onPreSolveAsync(fCallback)
	{
		this.onPreSolve();
		return fCallback();
	}

	solve()
	{
		return this.onPreSolve();
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after solve.
	 *
	 * @return {void}
	 */
	solveAsync(fCallback)
	{
		this.onPreSolve();
		return fCallback();
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data pre-load.
	 */
	onBeforeLoadDataAsync(fCallback)
	{
		return fCallback();
	}

	/**
	 * Hook to allow the provider to load data during application data load.
	 *
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data load.
	 */
	onLoadDataAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onLoadDataAsync:`);
		}
		return fCallback();
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data post-load.
	 */
	onAfterLoadDataAsync(fCallback)
	{
		return fCallback();
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data pre-load.
	 *
	 * @return {void}
	 */
	onBeforeSaveDataAsync(fCallback)
	{
		return fCallback();
	}

	/**
	 * Hook to allow the provider to load data during application data load.
	 *
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data load.
	 *
	 * @return {void}
	 */
	onSaveDataAsync(fCallback)
	{
		if (this.pict.LogNoisiness > 3)
		{
			this.log.trace(`PictProvider [${this.UUID}]::[${this.Hash}] ${this.options.ProviderIdentifier} onSaveDataAsync:`);
		}
		return fCallback();
	}

	/**
	 * @param {(pError?: Error) => void} fCallback - The callback to call after the data post-load.
	 *
	 * @return {void}
	 */
	onAfterSaveDataAsync(fCallback)
	{
		return fCallback();
	}
}

module.exports = PictProvider;
