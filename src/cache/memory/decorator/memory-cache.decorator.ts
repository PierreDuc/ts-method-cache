import { baseCacheDecorator } from '../../../core/decorator/base-cache.decorator';
import { CacheType } from '../../../core/enum/cache-type.enum';
import { MemoryCacheOptions } from '../interface/memory-cache-options';

export function MemoryCache(options?: MemoryCacheOptions | string): MethodDecorator {
  return baseCacheDecorator<MemoryCacheOptions>(CacheType.Memory, options);
}
