export interface CacheProvider {

    readonly containers: Map<string, any>;

    addToContainer(container: string, key: string): void;

    clearContainer(container: string): void;

    clearCache(): void;

    clearKeyCache(key: string): void;

    getCache(key: string, args: string): any;

    hasCache(key: string, args: string): boolean;

    setCache(key: string, args: string, cache: any): void;

}