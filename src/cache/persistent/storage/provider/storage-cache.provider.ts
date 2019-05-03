import { CacheType } from '../../../../core/enum/cache-type.enum';
import { PersistentCacheProvider } from '../../persistent-cache.provider';
import { PersistentStorage } from '../../persistent-storage';
import { StorageCacheOptions } from '../interface/storage-cache-options';
import { StorageCacheObject } from '../object/storage-cache.object';

export class StorageCacheProvider extends PersistentCacheProvider<StorageCacheObject, StorageCacheOptions> {
  protected cache: StorageCacheObject[] = [];

  protected cacheObjectType: { new (options: StorageCacheOptions): StorageCacheObject } = StorageCacheObject;

  protected cacheType: CacheType = CacheType.Storage;

  constructor() {
    super();
    this.storage = new PersistentStorage(this.cacheType);
    this.restoreCacheObjects();
  }
}
