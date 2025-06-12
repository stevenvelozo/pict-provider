export = PictProvider;
declare class PictProvider {
    /**
     * @param {import('fable')} pFable - The Fable instance.
     * @param {Record<string, any>} [pOptions] - The options for the provider.
     * @param {string} [pServiceHash] - The service hash for the provider.
     */
    constructor(pFable: any, pOptions?: Record<string, any>, pServiceHash?: string);
    /** @type {import('fable') & import('pict') & { instantiateServiceProviderWithoutRegistration(pServiceType: string, pOptions?: Record<string, any>, pCustomServiceHash?: string): any }} */
    fable: any & import("pict") & {
        instantiateServiceProviderWithoutRegistration(pServiceType: string, pOptions?: Record<string, any>, pCustomServiceHash?: string): any;
    };
    /** @type {import('fable') & import('pict') & { instantiateServiceProviderWithoutRegistration(pServiceType: string, pOptions?: Record<string, any>, pCustomServiceHash?: string): any }} */
    pict: any & import("pict") & {
        instantiateServiceProviderWithoutRegistration(pServiceType: string, pOptions?: Record<string, any>, pCustomServiceHash?: string): any;
    };
    /** @type {any} */
    log: any;
    /** @type {Record<string, any>} */
    options: Record<string, any>;
    /** @type {string} */
    UUID: string;
    /** @type {string} */
    Hash: string;
    serviceType: string;
    /** @type {Record<string, any>} */
    _Package: Record<string, any>;
    /** @type {Record<string, any>} */
    AppData: Record<string, any>;
    /** @type {Record<string, any>} */
    Bundle: Record<string, any>;
    initializeTimestamp: boolean;
    lastSolvedTimestamp: boolean;
    onBeforeInitialize(): boolean;
    onBeforeInitializeAsync(fCallback: any): any;
    onInitialize(): boolean;
    onInitializeAsync(fCallback: any): any;
    initialize(): boolean;
    initializeAsync(fCallback: any): any;
    onAfterInitialize(): boolean;
    onAfterInitializeAsync(fCallback: any): any;
    onPreRender(): boolean;
    onPreRenderAsync(fCallback: any): any;
    render(): boolean;
    renderAsync(fCallback: any): any;
    onPreSolve(): boolean;
    onPreSolveAsync(fCallback: any): any;
    solve(): boolean;
    solveAsync(fCallback: any): any;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after the data pre-load.
     */
    onBeforeLoadDataAsync(fCallback: (pError?: Error) => void): void;
    /**
     * Hook to allow the provider to load data during application data load.
     *
     * @param {(pError?: Error) => void} fCallback - The callback to call after the data load.
     */
    onLoadDataAsync(fCallback: (pError?: Error) => void): void;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after the data post-load.
     */
    onAfterLoadDataAsync(fCallback: (pError?: Error) => void): void;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after the data pre-load.
     */
    onBeforeSaveDataAsync(fCallback: (pError?: Error) => void): void;
    /**
     * Hook to allow the provider to load data during application data load.
     *
     * @param {(pError?: Error) => void} fCallback - The callback to call after the data load.
     */
    onSaveDataAsync(fCallback: (pError?: Error) => void): void;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after the data post-load.
     */
    onAfterSaveDataAsync(fCallback: (pError?: Error) => void): void;
}
//# sourceMappingURL=Pict-Provider.d.ts.map