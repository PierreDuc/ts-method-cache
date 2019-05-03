import { CacheContainerOptions } from '../../core/interface/cache-container-options';
import { CacheContainerObject } from '../../core/object/cache-container.object';
import { BaseCacheProvider } from '../../core/provider/base-cache.provider';
import { PersistentCacheModel } from './persistent-cache-model';
import { PersistentCacheOptions } from './persistent-cache-options';
import { PersistentCacheObject } from './persistent-cache.object';
import { PersistentContainerModel } from './persistent-container-model';
import { PersistentStorage } from './persistent-storage';

export abstract class PersistentCacheProvider<
  T extends PersistentCacheObject<U>,
  U extends PersistentCacheOptions
> extends BaseCacheProvider<T, U> {
  protected storage!: PersistentStorage<U>;

  protected constructor() {
    super();
  }

  public addToContainer(containerOptions: CacheContainerOptions, cacheObject: T): void {
    super.addToContainer(containerOptions, cacheObject);
    this.saveContainers();
  }

  public clearCache(): void {
    super.clearCache();
    this.saveCache();
    this.saveContainers();
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

  public setCache(options: U, args: string, cache: any): void {
    super.setCache(options, args, cache);
    this.saveCache();
  }

  protected restoreCacheObjects(): void {
    this.cache.length = 0;
    this.containers.length = 0;

    const cacheObjects: PersistentCacheModel<U>[] = this.storage.getStorageItems();
    const containerObjects: PersistentContainerModel[] = this.storage.getContainerItems();

    cacheObjects.forEach((cacheObject) => this.initiateCacheObject(cacheObject.options));

    containerObjects.forEach((containerObject: PersistentContainerModel) => {
      const container: CacheContainerObject = this.initiateCacheContainer(containerObject.options);
      containerObject.cacheObjects.forEach((cacheKey) => {
        const cache = this.getCacheObject(cacheKey);

        if (cache) {
          container.addCache(cache);
        }
      });
    });

    cacheObjects.forEach((cacheObject: PersistentCacheModel<U>) => {
      if (cacheObject.options.key) {
        const cache: T | undefined = this.getCacheObject(cacheObject.options.key);

        if (cache) {
          cache.restoreCacheObject(cacheObject.items, cacheObject.ttl);
        }
      }
    });
  }

  private async saveCache(): Promise<void> {
    this.storage.setStorageItems(
      await Promise.all(this.cache.map(async (cache) => cache.storeCacheObject()))
    );
  }

  private saveContainers(): void {
    const storageContainerCache: PersistentContainerModel[] = this.containers.map((container: CacheContainerObject) => {
      return {
        options: container.options,
        cacheObjects: container.cacheObjects.map((cache) => cache.key)
      };
    });

    this.storage.setContainerItems(storageContainerCache);
  }
}
