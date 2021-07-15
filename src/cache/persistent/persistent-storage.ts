import { LocalStorageCacheKey, LocalStorageContainerKey } from '../../core/constant/storage-keys.constant';
import { CacheType } from '../../core/enum/cache-type.enum';
import { PersistentCacheModel } from './persistent-cache-model';
import { PersistentCacheOptions } from './persistent-cache-options';
import { PersistentContainerModel } from './persistent-container-model';

export class PersistentStorage<T extends PersistentCacheOptions> {
  private readonly cache: object = {};

  private storage: Storage | chrome.storage.LocalStorageArea | undefined;

  constructor(private readonly cacheType: CacheType) {
    if (cacheType === CacheType.Session && typeof sessionStorage !== 'undefined') {
      this.storage = sessionStorage;
      // Add chrome.storage.local support
    } else if (cacheType === CacheType.Storage && typeof chrome.storage.local !== 'undefined') {
      this.storage = chrome.storage.local;
    }
    else if (cacheType === CacheType.Storage && typeof localStorage !== 'undefined') {
      this.storage = localStorage;
    }
  }

  public getStorageItems(): Promise<PersistentCacheModel<T>[]> {
    return this.getItem(LocalStorageCacheKey) || [];
  }

  public setStorageItems(items: PersistentCacheModel<T>[]): void {
    this.setItem(LocalStorageCacheKey, items);
  }

  public async getContainerItems(): Promise<PersistentContainerModel[]> {
    return this.getItem(LocalStorageContainerKey) || [];
  }

  public setContainerItems(items: PersistentContainerModel[]): void {
    this.setItem(LocalStorageContainerKey, items);
  }

  private setItem(key: string, data: PersistentContainerModel[] | PersistentCacheModel<T>[]): void {
    if (this.storage) {
      this.storage.set({key:data});
    } else {
      this.cache[key] = data;
    }
  }
  
  private getData(sKey: any) {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get(sKey, function (items) {
        if (chrome.runtime.lastError) {
          console.error(
            'utils: Error while getData ',
            chrome.runtime.lastError.message
          );
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(items[sKey]);
        }
      });
    });
  }
    
  private async getItem(key: string): Promise<any[]> {
    if (this.storage && 'QUOTA_BYTES' in this.storage) {
      const data = (await this.getData(key) as any);
      return data || '[]';
    } else if (this.storage) {
      return this.storage.get(key || '[]');
    }
    else {
      return this.cache[key];
    }
  }
}
