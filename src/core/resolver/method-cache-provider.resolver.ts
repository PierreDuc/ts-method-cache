import {MemoryCacheProvider} from '../../cache/memory/provider/memory-cache.provider';
import {SessionCacheProvider} from '../../cache/persistent/session/provider/session-cache.provider';
import {StorageCacheProvider} from '../../cache/persistent/storage/provider/storage-cache.provider';
import {CacheType} from '../enum/cache-type.enum';
import {BaseCacheOptions} from '../interface/base-cache-options';
import {CacheContainerOptions} from '../interface/cache-container-options';
import {BaseCacheObject} from '../object/base-cache.object';
import {BaseCacheProvider} from '../provider/base-cache.provider';

export type BaseCacheProviderType = BaseCacheProvider<BaseCacheObject<BaseCacheOptions>, BaseCacheOptions>;

const cacheProviders: Map<CacheType, BaseCacheProviderType> = new Map<CacheType, BaseCacheProviderType>([
  [CacheType.Memory, new MemoryCacheProvider()],
  [CacheType.Session, new SessionCacheProvider()],
  [CacheType.Storage, new StorageCacheProvider()]
]);

const containers: Map<Function, CacheContainerOptions> = new Map<Function, CacheContainerOptions>();

export function getMethodCacheProvider<T extends BaseCacheProviderType>(type: CacheType): T {
  return cacheProviders.get(type) as T;
}

export function setCacheContainer<T extends Function>(container: T, options: CacheContainerOptions): void {
  containers.forEach(testContainer => {
    if (testContainer.key === options.key) {
      throw new Error(`Cache container with name ${options.key} already exists`);
    }
  });
  containers.set(container, options);
}

export function getCacheContainer<T extends Function>(container: T): CacheContainerOptions | undefined {
  return containers.get(container);
}
