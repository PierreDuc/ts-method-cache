import {CacheType} from "../../../core/enum/cache-type.enum";
import {MemoryCacheOptions} from "../interface/memory-cache-options";
import {baseCacheDecorator} from "../../../core/decorator/base-cache.decorator";

export function MemoryCache<T extends MemoryCacheOptions>(options?: MemoryCacheOptions | string): MethodDecorator {

    return baseCacheDecorator<T>(CacheType.Memory, options as T);

}
