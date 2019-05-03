import { LocalStorageCacheKey, LocalStorageContainerKey } from '../../core/constant/storage-keys.constant';
import { CacheType } from '../../core/enum/cache-type.enum';
import { PersistentCacheModel } from './persistent-cache-model';
import { PersistentCacheOptions } from './persistent-cache-options';
import { PersistentContainerModel } from './persistent-container-model';

export class PersistentStorage<T extends PersistentCacheOptions> {
  private readonly cache: object = {};

  private storage: Storage | undefined;

  constructor(private readonly cacheType: CacheType) {
    if (cacheType === CacheType.Session && typeof sessionStorage !== 'undefined') {
      this.storage = sessionStorage;
    } else if (cacheType === CacheType.Storage && typeof localStorage !== 'undefined') {
      this.storage = localStorage;
    }
  }

  public getStorageItems(): PersistentCacheModel<T>[] {
    return this.getItem(LocalStorageCacheKey) || [];
  }

  public setStorageItems(items: PersistentCacheModel<T>[]): void {
    this.setItem(LocalStorageCacheKey, items);
  }

  public getContainerItems(): PersistentContainerModel[] {
    return this.getItem(LocalStorageContainerKey) || [];
  }

  public setContainerItems(items: PersistentContainerModel[]): void {
    this.setItem(LocalStorageContainerKey, items);
  }

  private setItem(key: string, data: PersistentContainerModel[] | PersistentCacheModel<T>[]): void {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(data));
    } else {
      this.cache[key] = data;
    }
  }

  private getItem(key: string): any[] {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(key) || '[]');
    } else {
      return this.cache[key];
    }
  }
}
