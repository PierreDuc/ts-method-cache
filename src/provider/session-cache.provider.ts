import * as CircularJSON from "circular-json";
import {LocalStorageCacheKey, LocalStorageContainerKey} from "../constant/storage-keys.constant";
import {CacheContainerOptions} from "../interface/cache-container-options";
import {StorageCacheObject} from "../interface/storage-cache-object";
import {StorageCacheOptions} from "../interface/storage-cache-options";
import {StorageContainerObject} from "../interface/storage-container-object";
import {CacheContainerObject} from "../object/cache-container.object";
import {CacheObject} from "../object/cache.object";
import {BaseCacheProvider} from "./base-cache.provider";

export class SessionCacheProvider extends BaseCacheProvider {

    protected storage: Storage;

    constructor() {
        super();
        this.setStorageVariable();
        this.restoreCacheObjects();
    }

    public addToContainer(containerOptions: CacheContainerOptions, cacheObject: CacheObject): void {
        super.addToContainer(containerOptions, cacheObject);
        this.saveContainers();
    }

    public clearCache(): void {
        super.clearCache();
        this.saveCache();
        this.saveContainers();
    }

    public clearCacheArgs(cache: CacheObject, args: string): void {
        super.clearCacheArgs(cache, args);
        this.saveCache();
    }

    public clearContainer(container: CacheContainerObject): void {
        super.clearContainer(container);
        this.saveContainers();
    }

    public clearContainers(): void {
        super.clearContainers();
        this.saveContainers();
    }

    public clearKeyCache(key: string): void {
        super.clearKeyCache(key);
        this.saveCache();
    }

    public clearKeyContainer(containerKey: string): void {
        super.clearKeyContainer(containerKey);
        this.saveContainers();
    }

    public setCache(options: StorageCacheOptions, args: string, cache: any): void {
        super.setCache(options, args, cache);
        this.saveCache();
    }

    protected setStorageVariable(): void {
        this.storage = sessionStorage;
    }

    private restoreCacheObjects(): void {
        let cacheObjects: StorageCacheObject[] = CircularJSON.parse(this.storage.getItem(LocalStorageCacheKey)!);
        let containerObjects: StorageContainerObject[] = CircularJSON.parse(this.storage.getItem(LocalStorageContainerKey)!);

        if (cacheObjects && Array.isArray(cacheObjects)) {
            cacheObjects.forEach(cacheObject => this.cache.push(new CacheObject(cacheObject.options)));
        } else {
            this.saveCache();
        }

        if (containerObjects && Array.isArray(containerObjects)) {
            containerObjects.forEach((containerObject: StorageContainerObject) => {
                let container: CacheContainerObject = new CacheContainerObject(containerObject.options);
                this.containers.push(container);
                if (Array.isArray(containerObject.cacheObjects)) {
                    containerObject.cacheObjects.forEach(cacheKey => container.addCache(this.getCacheObject(cacheKey)));
                }
            });
        } else {
            this.saveContainers();
        }

        if (cacheObjects && Array.isArray(cacheObjects)) {
            cacheObjects.forEach((cacheObject: StorageCacheObject) => {
                let cache: CacheObject = this.getCacheObject(cacheObject.options.key!);
                cache.restoreCacheObject(cacheObject.items, cacheObject.ttl);
            });
        }
    }

    private async saveCache(): Promise<void> {
        let storageCache: StorageCacheObject[] = await Promise.all(this.cache.map(async cache => await cache.storeCacheObject()));
        this.storage.setItem(LocalStorageCacheKey, CircularJSON.stringify(storageCache));
    }

    private saveContainers(): void {
        let storageContainerCache: StorageContainerObject[] = this.containers.map((container: CacheContainerObject) => {
            return {
                options: container.options,
                cacheObjects: container.cacheObjects.map(cache => cache.key)
            }
        });

        this.storage.setItem(LocalStorageContainerKey, CircularJSON.stringify(storageContainerCache));
    }

}
