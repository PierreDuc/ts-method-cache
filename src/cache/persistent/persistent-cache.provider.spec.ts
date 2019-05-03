import { CacheReturnType } from '../../';
import { LocalStorageCacheKey, LocalStorageContainerKey } from '../../core/constant/storage-keys.constant';
import { CacheType } from '../../core/enum/cache-type.enum';
import { wait } from '../../core/util/promise.util';
import { PersistentCacheModel } from './persistent-cache-model';
import { PersistentCacheOptions } from './persistent-cache-options';
import { PersistentContainerModel } from './persistent-container-model';
import { PersistentStorage } from './persistent-storage';
import { SessionCacheProvider } from './session/provider/session-cache.provider';
import { StorageCacheProvider } from './storage/provider/storage-cache.provider';

describe('Persistent cache provider', async () => {
  const checkCache = async (provider: SessionCacheProvider | StorageCacheProvider, key: string): Promise<void> => {
    const containerKey: string = `cacheContainer${key}`;
    provider.setCache({ key, returnType: CacheReturnType.Static }, '[]', 'test');
    provider.addToContainer({ key: containerKey }, provider.getCacheObject(key) as any);

    await wait();

    provider['restoreCacheObjects']();

    const cacheModel: PersistentCacheModel<PersistentCacheOptions> = provider['storage']
      .getStorageItems(LocalStorageCacheKey)
      .find((item) => item.options.key === key);
    const containerModel: PersistentContainerModel = provider['storage']
      .getContainerItems(LocalStorageContainerKey)
      .find((item) => item.options.key === containerKey);

    expect(cacheModel.items['[]']).toEqual('test');
    expect(cacheModel.options.key).toEqual(key);
    expect(cacheModel.options.returnType).toEqual(CacheReturnType.Static);
    expect(containerModel.cacheObjects.find((item) => item === key)).toEqual(key);
  };

  await it('should store in the appropriate storage', async () => {
    const now: number = Date.now();
    const sessionCache: SessionCacheProvider = new SessionCacheProvider();
    const storageCache: StorageCacheProvider = new StorageCacheProvider();

    await Promise.all([checkCache(sessionCache, `T${now}`), checkCache(storageCache, `T${now + 10}`)]);

    sessionCache['storage'] = new PersistentStorage(CacheType.Memory);
    sessionCache['restoreCacheObjects']();

    await checkCache(sessionCache, `T${now + 20}`);
  });
});
