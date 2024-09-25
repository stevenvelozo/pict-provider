/*
	Unit tests for Pict View
*/


const Chai = require('chai');
const Expect = Chai.expect;

const libPict = require('pict');

const libPictProvider = require(`../source/Pict-Provider.js`);

suite
(
	'Pict Provider Basic Tests',
	() =>
	{
		setup(() => { });

		suite
			(
				'Basic Basic Tests',
				() =>
				{
					test(
							'Add a provider that does nothing',
							(fDone) =>
							{
								let _Pict = new libPict();
								let _PictEnvironment = new libPict.EnvironmentLog(_Pict);

								let _PictProvider = _Pict.addProvider('Pict-Provider-Test', {}, libPictProvider);

								Expect(_PictProvider).to.be.an('object');

								// Test package anthropology
								Expect(_PictProvider._PackageFableServiceProvider).to.be.an('object', 'Fable should have a _PackageFableServiceProvider object.');
								Expect(_PictProvider._PackageFableServiceProvider.name).equal('fable-serviceproviderbase', 'Fable _PackageFableServiceProvider.package.name should be set.');
								Expect(_PictProvider._Package).to.be.an('object', 'Fable should have a _Package object.');
								Expect(_PictProvider._Package.name).to.equal('pict-provider', 'Fable _Package.package.name should be set.');

								return fDone();
							}
						);
				}
			);
	}
);