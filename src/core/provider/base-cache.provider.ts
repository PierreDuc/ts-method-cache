import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheContainerObject} from "../object/cache-container.object";
import {BaseCacheObject} from "../object/base-cache.object";
import {BaseCacheOptions} from "../interface/base-cache-options";

export abstract class BaseCacheProvider {

    protected cache: BaseCacheObject[] = [];

    protected containers: CacheContainerObject[] = [];

    public addToContainer(containerOptions: CacheContainerOptions, cacheObject: BaseCacheObject): void {
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

    public clearCacheArgs(cache: BaseCacheObject, args: string): void {
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
        let cacheObject: BaseCacheObject = this.getCacheObject(key);
        cacheObject && cacheObject.clear();
    }

    public clearKeyContainer(containerKey: string): void {
        let container: CacheContainerObject = this.getCacheContainer(containerKey);
        container && this.clearContainer(container);
    }

    public createCacheObject(options: BaseCacheOptions): BaseCacheObject {
        let cacheObject: BaseCacheObject = this.getCacheObject(options.key!);
        if (!cacheObject) {
            cacheObject = this.initiateCacheObject(options);
            this.cache.push(cacheObject);
        }
        return cacheObject;
    }

    public getCache(key: string, args: string): any {
        let cacheObject: BaseCacheObject = this.getCacheObject(key);
        return cacheObject && cacheObject.getCache(args);
    }

    public getCacheObject(key: string): BaseCacheObject {
        return this.cache.filter(cache => cache.key === key)[0];
    }

    public hasCache(key: string, args: string): boolean {
        let cacheObject: BaseCacheObject = this.getCacheObject(key);
        return cacheObject && cacheObject.hasCache(args);
    }

    public setCache(options: BaseCacheOptions, args: string, cache: any): void {
        let cacheObject: BaseCacheObject = this.createCacheObject(options);
        cacheObject.setCache(args, cache);
    }

    protected getCacheContainer(containerKey: string): CacheContainerObject {
        return this.containers.filter(container => container.key === containerKey)[0];
    }

    protected initiateCacheObject(options: BaseCacheOptions): BaseCacheObject {
        return new BaseCacheObject(options);
    }

}