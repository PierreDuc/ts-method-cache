import {CacheType} from "../enum/cache-type.enum";
import {BaseCacheOptions} from "../interface/base-cache-options";
import {createCacheDecorator, normalizeCacheSettings} from "../util/decorator.util";

export function baseCacheDecorator<T extends BaseCacheOptions>(cacheType: CacheType, options?: T | string): MethodDecorator {

  options = normalizeCacheSettings<T>(options!);

  return (target: object, method: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {

    if (descriptor.hasOwnProperty('get')) {
      descriptor.get = createCacheDecorator(cacheType, target, descriptor.get!, options as T);
    } else if (!descriptor.hasOwnProperty('set')) {
      descriptor.value = createCacheDecorator(cacheType, target, descriptor.value!, options as T);
    }

    return descriptor;

  };
}