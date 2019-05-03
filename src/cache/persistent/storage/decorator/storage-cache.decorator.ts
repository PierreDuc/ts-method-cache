import { baseCacheDecorator } from '../../../../core/decorator/base-cache.decorator';
import { CacheType } from '../../../../core/enum/cache-type.enum';
import { StorageCacheOptions } from '../interface/storage-cache-options';

export function StorageCache(options: StorageCacheOptions | string): MethodDecorator {
  return baseCacheDecorator<StorageCacheOptions>(CacheType.Storage, options);
}
