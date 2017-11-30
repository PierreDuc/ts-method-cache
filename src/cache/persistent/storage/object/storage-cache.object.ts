import {CacheType} from '../../../../core/enum/cache-type.enum';
import {PersistentCacheObject} from '../../persistent-cache.object';
import {StorageCacheOptions} from '../interface/storage-cache-options';

export class StorageCacheObject extends PersistentCacheObject<StorageCacheOptions> {

  public readonly cacheType: CacheType = CacheType.Storage;

}
