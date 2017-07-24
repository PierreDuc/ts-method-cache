import {CacheType} from "../enum/cache-type.enum";
import {createCacheDecorator, normalizeCacheSettings} from "../util/decorator.util";
import {BaseCacheOptions} from "../interface/base-cache-options";

export function baseCacheDecorator<T extends BaseCacheOptions>(cacheType: CacheType, options?: T | string): MethodDecorator {

    options = normalizeCacheSettings<T>(options!);

    return (target: Object, method: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {

        descriptor.value = createCacheDecorator(cacheType, target, descriptor.value!, options as T);

        return descriptor;

    };
}