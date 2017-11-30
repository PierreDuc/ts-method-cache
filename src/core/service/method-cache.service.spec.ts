import {MemoryCache} from '../../cache/memory/decorator/memory-cache.decorator';
import {SessionCache} from '../../cache/persistent/session/decorator/session-cache.decorator';
import {StorageCache} from '../../cache/persistent/storage/decorator/storage-cache.decorator';
import {CacheContainer} from '../decorator/cache-container.decorator';
import {wait} from '../util/promise.util';
import {MethodCacheService} from './method-cache.service';

const testCacheContainer: string = 'testCacheContainer';
const testMemoryMethod: string = 'testMemoryMethod';
const testSessionMethod: string = 'testSessionMethod';
const testStorageMethod: string = 'testStorageMethod';

@CacheContainer(testCacheContainer)
class TestCache {

  public testMemoryMethodCalled: number = 0;
  public testSessionMethodCalled: number = 0;
  public testStorageMethodCalled: number = 0;

  @MemoryCache(testMemoryMethod)
  public testMemoryMethod(): void {
    this.testMemoryMethodCalled++;
  }

  @SessionCache(testSessionMethod)
  public testSessionMethod(): void {
    this.testSessionMethodCalled++;
  }

  @StorageCache(testStorageMethod)
  public testStorageMethod(): void {
    this.testStorageMethodCalled++;
  }
}

describe('Method cache service can clear cache', () => {
  const cacheService: MethodCacheService = new MethodCacheService();
  const runTestMethodsExpect = async (memoryCount: number, sessionCount: number, storageCount: number) => {
    testCache.testMemoryMethod();
    testCache.testSessionMethod();
    testCache.testStorageMethod();

    expect(testCache.testMemoryMethodCalled).toEqual(memoryCount);
    expect(testCache.testSessionMethodCalled).toEqual(sessionCount);
    await wait();
    expect(testCache.testStorageMethodCalled).toEqual(storageCount);
    await wait();
  };

  cacheService.clearAllCache();
  let testCache: TestCache;

  beforeEach(async () => {
    cacheService.clearAllCache();
    testCache = new TestCache();
    await runTestMethodsExpect(1, 1, 1);
  });

  it("it should just clear the memory cache", async () => {
    cacheService.clearMemoryCache();
    await runTestMethodsExpect(2, 1, 1);
  });

  it("it should just clear the session cache", async () => {
    cacheService.clearSessionCache();
    await runTestMethodsExpect(1, 2, 1);
  });

  it("it should just clear the storage cache", async () => {
    cacheService.clearStorageCache();
    await runTestMethodsExpect(1, 1, 2);
  });

  it("it should clear cache of an entire container", async () => {
    cacheService.clearContainer(testCacheContainer);
    await runTestMethodsExpect(2, 2, 2);
  });

  it("it should just clear cache of a certain method from memory", async () => {
    cacheService.clearMemoryKeyCache(testMemoryMethod);
    await runTestMethodsExpect(2, 1, 1);
  });

  it("it should just clear cache of a certain method from session", async () => {
    cacheService.clearSessionKeyCache(testSessionMethod);
    await runTestMethodsExpect(1, 2, 1);
  });

  it("it should just clear cache of a certain method from storage", async () => {
    cacheService.clearStorageKeyCache(testStorageMethod);
    await runTestMethodsExpect(1, 1, 2);
  });
});