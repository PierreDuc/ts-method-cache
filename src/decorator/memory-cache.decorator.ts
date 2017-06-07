import {CacheType} from "../enum/cache-type.enum";
import {MemoryCacheOptions} from "../interface/memory-cache-options";
import {baseCacheDecorator} from "./base-cache.decorator";

export function MemoryCache<T extends Function, U extends MemoryCacheOptions>(options?: MemoryCacheOptions | string): MethodDecorator {

    return baseCacheDecorator<T, U>(CacheType.Memory, <U>options);

}
