import { CacheType } from '../enum/cache-type.enum';
import { BaseCacheOptions } from '../interface/base-cache-options';
import { CacheContainerOptions } from '../interface/cache-container-options';
import { BaseCacheObject } from '../object/base-cache.object';
import { BaseCacheProvider } from '../provider/base-cache.provider';
import {
  getCacheContainer,
  getMethodCacheProvider,
  setCacheContainer
} from '../resolver/method-cache-provider.resolver';

import { createGUID } from './string.util';

export function createCacheDecorator(
  type: CacheType,
  target: object,
  method: (...args) => any,
  options: BaseCacheOptions
): () => any {
  const provider: BaseCacheProvider<BaseCacheObject<BaseCacheOptions>, BaseCacheOptions> = getMethodCacheProvider(type);
  const cacheObject: BaseCacheObject<BaseCacheOptions> | undefined =
    (options.key && provider.getCacheObject(options.key)) || provider.createCacheObject(options);

  let container: CacheContainerOptions | undefined | null = null;

  return function(this: (...args) => any, ...args: any[]): any {
    const argsString: string = options.calculateCacheKeyFunction
      ? options.calculateCacheKeyFunction(this, args)
      : JSON.stringify(args);
    if (container === null) {
      container = getCacheContainer(target.constructor as any);
      if (container) {
        provider.addToContainer(container, cacheObject);
      }
    }

    if (!cacheObject.hasCache(argsString) || cacheObject.isExpired(argsString)) {
      const res = method.call(this, ...args);

      provider.setCache(options, argsString, res);

      const isPromise = res && typeof res.then === 'function' && typeof res.catch === 'function';

      if (isPromise && options.cacheUntilRejected) {
        res.catch(() => cacheObject.clearArgs(argsString));
      }
    }

    return cacheObject.getCache(argsString);
  };
}

export function createCacheContainerDecorator(options: CacheContainerOptions): ClassDecorator {
  return (target: any): any => {
    setCacheContainer(target, options);

    return target;
  };
}

export function normalizeCacheSettings<U extends BaseCacheOptions>(options?: U | string): U {
  if (typeof options === 'string') {
    options = { key: options } as U;
  } else if (!options) {
    options = { key: '' } as U;
  }

  if (!options.key) {
    options.key = createGUID();
  }

  return options;
}

export function normalizeCacheContainerSettings(options: CacheContainerOptions | string): CacheContainerOptions {
  return normalizeCacheSettings<CacheContainerOptions>(options);
}
