import {CacheType} from "../enum/cache-type.enum";
import {CacheOptions} from "../interface/cache-options";
import {createCacheDecorator, normalizeCacheSettings} from "../util/decorator.util";

export function baseCacheDecorator<T extends Function, U extends CacheOptions>(cacheType: CacheType, options?: U | string): MethodDecorator {

    options = normalizeCacheSettings<U>(options!);

    return (target: Object, method: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {

        descriptor.value = createCacheDecorator<T>(cacheType, target, descriptor.value!, options!);

        return descriptor;

    };
}