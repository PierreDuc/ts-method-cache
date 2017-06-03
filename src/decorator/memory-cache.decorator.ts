import {CacheOptions} from "../interface/cache-options";
import {createCacheDecorator, normalizeCacheSettings} from "../util/decorator.util";
import {CacheType} from "../enum/cache-type.enum";
import {MemoryCacheOptions} from "../interface/memory-cache-options";

export function MemoryCache<T extends Function>(options?: MemoryCacheOptions|string): MethodDecorator {

    return (target: any, method: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {

        options = normalizeCacheSettings(options!);

        descriptor.value = <T>createCacheDecorator(CacheType.Memory, target, <Function>descriptor.value, options);

        return descriptor;

    };
}
