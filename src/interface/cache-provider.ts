export interface CacheProvider {

    hasCache(key: string, args: string): boolean;

    setCache(key: string, args: string, cache: any): void;

    getCache(key: string, args: string): any;

}