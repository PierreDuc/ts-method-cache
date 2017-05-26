import {CacheProvider} from "../interface/cache-provider";
import {BaseCacheProvider} from "./base-cache.provider";

export class MemoryCacheProvider extends BaseCacheProvider implements CacheProvider {

    protected cache: Map<string, Map<string, any>> = new Map();

    public clearCache(): void {
        this.cache.clear();
    }

    public clearKeyCache(key: string): void {
        console.log('hii');
        console.log(key);
        this.cache.delete(key);
    }

    public getCache(key: string, args: string): any {
        return this.getCacheArgs(key).get(args);
    }

    public hasCache(key: string, args: string): boolean {
        return this.getCacheArgs(key).has(args);
    }

    public setCache(key: string, args: string, cache: any): void {
        this.getCacheArgs(key).set(args, cache);
    }

    private getCacheArgs(key: string): Map<string, any> {
        if (!this.cache.has(key)) {
            this.cache.set(key, new Map());
        }
        return this.cache.get(key)!;
    }

}