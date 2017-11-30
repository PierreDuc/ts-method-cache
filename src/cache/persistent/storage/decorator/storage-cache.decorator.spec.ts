import {StorageCache} from './storage-cache.decorator';

describe('Storage cache decorator is properly set', () => {

  class TestCache {

    public called: number = 0;

    @StorageCache('testMethod')
    public testMethod(): void {
      this.called++;
    }

  }

  StorageCache('testMethod')(TestCache.prototype, 'testMethod', Object.getOwnPropertyDescriptor(TestCache.prototype, 'testMethod')!);
  const testCache: TestCache = new TestCache();

  it("should only call the test method once", () => {
    testCache.testMethod();
    testCache.testMethod();
    expect(testCache.called).toEqual(1);
  });

});