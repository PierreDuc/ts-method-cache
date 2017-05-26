import {CacheProvider} from "../interface/cache-provider";

export class MemoryCacheProvider implements CacheProvider {

    private cache: Map<string, Map<string, any>> = new Map();

    public hasCache(key: string, args: string): boolean {
        return this._getCacheArgs(key).has(args);
    }

    public setCache(key: string, args: string, cache: any): void {
        this._getCacheArgs(key).set(args, cache);
    }

    public getCache(key: string, args: string): any {
        return this._getCacheArgs(key).get(args);
    }

    private _getCacheArgs(key: string): Map<string, any> {
        if (!this.cache.has(key)) {
            this.cache.set(key, new Map());
        }
        return <Map<string, any>>this.cache.get(key);
    }

}