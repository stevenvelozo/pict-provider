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
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after pre-pinitialization.
     *
     * @return {void}
     */
    onBeforeInitializeAsync(fCallback: (pError?: Error) => void): void;
    onInitialize(): boolean;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
     *
     * @return {void}
     */
    onInitializeAsync(fCallback: (pError?: Error) => void): void;
    initialize(): boolean;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
     *
     * @return {void}
     */
    initializeAsync(fCallback: (pError?: Error) => void): void;
    onAfterInitialize(): boolean;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
     *
     * @return {void}
     */
    onAfterInitializeAsync(fCallback: (pError?: Error) => void): void;
    onPreRender(): boolean;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after pre-render.
     *
     * @return {void}
     */
    onPreRenderAsync(fCallback: (pError?: Error) => void): void;
    render(): boolean;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after render.
     *
     * @return {void}
     */
    renderAsync(fCallback: (pError?: Error) => void): void;
    onPreSolve(): boolean;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after pre-solve.
     *
     * @return {void}
     */
    onPreSolveAsync(fCallback: (pError?: Error) => void): void;
    solve(): boolean;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after solve.
     *
     * @return {void}
     */
    solveAsync(fCallback: (pError?: Error) => void): void;
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
     *
     * @return {void}
     */
    onBeforeSaveDataAsync(fCallback: (pError?: Error) => void): void;
    /**
     * Hook to allow the provider to load data during application data load.
     *
     * @param {(pError?: Error) => void} fCallback - The callback to call after the data load.
     *
     * @return {void}
     */
    onSaveDataAsync(fCallback: (pError?: Error) => void): void;
    /**
     * @param {(pError?: Error) => void} fCallback - The callback to call after the data post-load.
     *
     * @return {void}
     */
    onAfterSaveDataAsync(fCallback: (pError?: Error) => void): void;
}
//# sourceMappingURL=Pict-Provider.d.ts.map