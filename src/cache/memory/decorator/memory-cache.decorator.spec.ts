import { MemoryCache } from './memory-cache.decorator';

describe('Memory cache decorator is properly set', () => {
  class TestCache {
    public called: number = 0;

    @MemoryCache()
    public testMethod(): void {
      this.called++;
    }
  }
  const descriptor = Object.getOwnPropertyDescriptor(TestCache.prototype, 'testMethod');

  if (descriptor) {
    MemoryCache()(TestCache.prototype, 'testMethod', descriptor);
  }

  const testCache: TestCache = new TestCache();

  it('should only call the test method once', () => {
    testCache.testMethod();
    testCache.testMethod();
    expect(testCache.called).toEqual(1);
  });
});
