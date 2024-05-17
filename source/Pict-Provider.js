const libFableServiceBase = require('fable-serviceproviderbase');

const defaultPictProviderSettings = (
	{
		ProviderIdentifier: false,

		// If this is set to true, when the App initializes this will.
		// After the App initializes, initialize will be called as soon as it's added.
		AutoInitialize: true,
		AutoInitializeOrdinal: 0,

		AutoSolveWithApp: true,
		AutoSolveOrdinal: 0,

		Manifests: {}
	});

class PictProvider extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		// Intersect default options, parent constructor, service information
		let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictProviderSettings)), pOptions);
		super(pFable, tmpOptions, pServiceHash);
		if (!this.options.ProviderIdentifier)
		{
			this.options.ProviderIdentifier = `AutoProviderID-${this.fable.getUUID()}`;
		}

		this.serviceType = 'PictProvider';

		// Convenience and consistency naming
		this.pict = this.fable;

		// Wire in the essential Pict application state
		this.AppData = this.pict.AppData;

		this.initializeTimestamp = false;
		this.lastSolvedTimestamp = false;

		// Load all default templates from the array in the options
		// Templates are in the form of {Prefix:'',Postfix:'-List-Row',Template:'Template content',Source:'TemplateSourceString'}
		for (let i = 0; i < this.options.DefaultTemplates.length; i++)
		{
			let tmpDefaultTemplate = this.options.DefaultTemplates[i];

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
					if (this.pict.LogNoisiness > 0)
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
	onAfterInitializeAsync(fCallback)
	{
		this.onAfterInitialize();
		return fCallback();
	}
}

module.exports = PictProvider;