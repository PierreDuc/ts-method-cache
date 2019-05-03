import { SessionCache } from './session-cache.decorator';

describe('Session cache decorator is properly set', () => {
  class TestCache {
    public called: number = 0;

    @SessionCache('testMethod')
    public testMethod(): void {
      this.called++;
    }
  }

  SessionCache('testMethod')(
    TestCache.prototype,
    'testMethod',
    Object.getOwnPropertyDescriptor(TestCache.prototype, 'testMethod') as any
  );
  const testCache: TestCache = new TestCache();

  it('should only call the test method once', () => {
    testCache.testMethod();
    testCache.testMethod();
    expect(testCache.called).toEqual(1);
  });
});
