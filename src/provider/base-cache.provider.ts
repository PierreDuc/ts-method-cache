import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheOptions} from "../interface/cache-options";
import {CacheContainerObject} from "../object/cache-container.object";
import {CacheObject} from "../object/cache.object";

export abstract class BaseCacheProvider {

    protected cache: CacheObject[] = [];

    protected containers: CacheContainerObject[] = [];

    public addToContainer(containerOptions: CacheContainerOptions, cacheObject: CacheObject): void {
        let container: CacheContainerObject = this.getCacheContainer(containerOptions.key!);
        if (!container) {
            container = new CacheContainerObject(containerOptions);
            this.containers.push(container);
        }
        container.addCache(cacheObject);
    }

    public clearCache(): void {
        this.cache.forEach(cache => cache.clear());
        this.cache.length = 0;
        this.clearContainers()
    }

    public clearCacheArgs(cache: CacheObject, args: string): void {
        cache.clearArgs(args);
    }

    public clearContainer(container: CacheContainerObject): void {
        container.clear();
    }

    public clearContainers(): void {
        this.containers.forEach(container => this.clearContainer(container));
        this.containers.length = 0;
    }

    public clearKeyCache(key: string): void {
        let cacheObject: CacheObject = this.getCacheObject(key);
        cacheObject && cacheObject.clear();
    }

    public clearKeyContainer(containerKey: string): void {
        let container: CacheContainerObject = this.getCacheContainer(containerKey);
        container && this.clearContainer(container);
    }

    public createCacheObject(options: CacheOptions): CacheObject {
        let cacheObject: CacheObject = this.getCacheObject(options.key!);
        if (!cacheObject) {
            cacheObject = new CacheObject(options);
            this.cache.push(cacheObject);
        }
        return cacheObject;
    }

    public getCache(key: string, args: string): any {
        let cacheObject: CacheObject = this.getCacheObject(key);
        return cacheObject && cacheObject.getCache(args);
    }

    public getCacheObject(key: string): CacheObject {
        return this.cache.filter(cache => cache.key === key)[0];
    }

    public hasCache(key: string, args: string): boolean {
        let cacheObject: CacheObject = this.getCacheObject(key);
        return cacheObject && cacheObject.hasCache(args);
    }

    public setCache(options: CacheOptions, args: string, cache: any): void {
        let cacheObject: CacheObject = this.createCacheObject(options);
        cacheObject.setCache(args, cache);
    }

    protected getCacheContainer(containerKey: string): CacheContainerObject {
        return this.containers.filter(container => container.key === containerKey)[0];
    }

}