import {LocalStorageCacheKey, LocalStorageContainerKey} from "../../../core/constant/storage-keys.constant";
import {CacheContainerOptions} from "../../../core/interface/cache-container-options";
import {StorageCacheModel} from "../../storage/model/storage-cache-model";
import {StorageContainerModel} from "../../storage/model/storage-container-model";
import {CacheContainerObject} from "../../../core/object/cache-container.object";
import {SessionCacheObject} from "../object/session-cache.object";
import {BaseCacheProvider} from "../../../core/provider/base-cache.provider";
import {SessionCacheOptions} from "../interface/session-cache-options";

export class SessionCacheProvider extends BaseCacheProvider {

    protected cache: SessionCacheObject[] = [];

    protected storage: Storage = sessionStorage;

    constructor() {
        super();
        this.restoreCacheObjects();
    }

    public addToContainer(containerOptions: CacheContainerOptions, cacheObject: SessionCacheObject): void {
        super.addToContainer(containerOptions, cacheObject);
        this.saveContainers();
    }

    public clearCache(): void {
        super.clearCache();
        this.saveCache();
        this.saveContainers();
    }

    public clearCacheArgs(cache: SessionCacheObject, args: string): void {
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

    public setCache(options: SessionCacheOptions, args: string, cache: any): void {
        super.setCache(options, args, cache);
        this.saveCache();
    }

    protected initiateCacheObject(options: SessionCacheOptions): SessionCacheObject {
        return new SessionCacheObject(options);
    }

    private restoreCacheObjects(): void {
        let cacheObjects: StorageCacheModel[] = JSON.parse(this.storage.getItem(LocalStorageCacheKey)!);
        let containerObjects: StorageContainerModel[] = JSON.parse(this.storage.getItem(LocalStorageContainerKey)!);

        if (cacheObjects && Array.isArray(cacheObjects)) {
            cacheObjects.forEach(cacheObject => this.cache.push(this.initiateCacheObject(cacheObject.options)));
        } else {
            this.saveCache();
        }

        if (containerObjects && Array.isArray(containerObjects)) {
            containerObjects.forEach((containerObject: StorageContainerModel) => {
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
            cacheObjects.forEach((cacheObject: StorageCacheModel) => {
                let cache: SessionCacheObject = <SessionCacheObject>this.getCacheObject(cacheObject.options.key!);
                cache.restoreCacheObject(cacheObject.items, cacheObject.ttl);
            });
        }
    }

    private async saveCache(): Promise<void> {
        let storageCache: StorageCacheModel[] = await Promise.all(this.cache.map(async cache => await cache.storeCacheObject()));
        this.storage.setItem(LocalStorageCacheKey, JSON.stringify(storageCache));
    }

    private saveContainers(): void {
        let storageContainerCache: StorageContainerModel[] = this.containers.map((container: CacheContainerObject) => {
            return {
                options: container.options,
                cacheObjects: container.cacheObjects.map(cache => cache.key)
            }
        });

        this.storage.setItem(LocalStorageContainerKey, JSON.stringify(storageContainerCache));
    }

}
