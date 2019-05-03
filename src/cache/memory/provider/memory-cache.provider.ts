import { CacheType } from '../../../core/enum/cache-type.enum';
import { BaseCacheProvider } from '../../../core/provider/base-cache.provider';
import { MemoryCacheOptions } from '../interface/memory-cache-options';
import { MemoryCacheObject } from '../object/memory-cache.object';

export class MemoryCacheProvider extends BaseCacheProvider<MemoryCacheObject, MemoryCacheOptions> {
  protected cache: MemoryCacheObject[] = [];

  protected cacheType: CacheType = CacheType.Memory;

  protected cacheObjectType: typeof MemoryCacheObject = MemoryCacheObject;
}
