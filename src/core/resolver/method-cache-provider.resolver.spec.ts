import {CacheContainer} from '../../';
import {MemoryCacheProvider} from '../../cache/memory/provider/memory-cache.provider';
import {SessionCacheProvider} from '../../cache/persistent/session/provider/session-cache.provider';
import {StorageCacheProvider} from '../../cache/persistent/storage/provider/storage-cache.provider';
import {CacheType} from '../enum/cache-type.enum';
import {getMethodCacheProvider} from './method-cache-provider.resolver';

describe('Method cache provider resolver', () => {

  const memoryProvider: MemoryCacheProvider = getMethodCacheProvider<MemoryCacheProvider>(CacheType.Memory);
  const sessionProvider: SessionCacheProvider = getMethodCacheProvider<SessionCacheProvider>(CacheType.Session);
  const storageProvider: StorageCacheProvider = getMethodCacheProvider<StorageCacheProvider>(CacheType.Storage);

  it('should create a memory cache provider', () => {
    expect(memoryProvider instanceof MemoryCacheProvider).toBeTruthy();
  });

  it('should create a session cache provider', () => {
    expect(sessionProvider instanceof SessionCacheProvider).toBeTruthy();
  });

  it('should create a storage cache provider', () => {
    expect(storageProvider instanceof StorageCacheProvider).toBeTruthy();
  });

  it('should only create one provider singleton per type', () => {
    expect(memoryProvider).toEqual(getMethodCacheProvider<MemoryCacheProvider>(CacheType.Memory));
    expect(sessionProvider).toEqual(getMethodCacheProvider<SessionCacheProvider>(CacheType.Session));
    expect(storageProvider).toEqual(getMethodCacheProvider<StorageCacheProvider>(CacheType.Storage));
  });

  it('should throw when multiple containers have the same name', () => {
    expect(() => {
      @CacheContainer('testSameName')
      class Container1 {}

      @CacheContainer('testSameName')
      class Container2 {}

    }).toThrowError();
  })
});