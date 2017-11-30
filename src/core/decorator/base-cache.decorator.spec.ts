import {CacheType} from "../enum/cache-type.enum";
import {baseCacheDecorator} from "./base-cache.decorator";

const increment: number = 5;

class TestCache {

  public called: number = 0;

  @baseCacheDecorator(CacheType.Memory)
  public testMethod(test: number = 0, decrement: number = 0): number {
    this.called++;
    return test + increment - decrement;
  }
}

describe('Cache decorator is properly set', () => {

  const testCache: TestCache = new TestCache();

  it("should only call the test method once per argument(s)", () => {
    testCache.testMethod();
    testCache.testMethod();

    testCache.testMethod(1);
    testCache.testMethod(1);

    testCache.testMethod(1, 1);
    testCache.testMethod(1, 1);

    expect(testCache.called).toEqual(3);
  });

  it("should return the right value for the right argument(s)", () => {
    const value1: number = 5;
    const value2: number = 10;

    const noCache1: number = testCache.testMethod(value1);
    const cache1: number = testCache.testMethod(value1);

    const noCache2: number = testCache.testMethod(value2);
    const cache2: number = testCache.testMethod(value2);

    const noCache3: number = testCache.testMethod(value1, value2);
    const cache3: number = testCache.testMethod(value1, value2);

    expect(noCache1).toEqual(cache1);
    expect(noCache1).toEqual(value1 + increment);

    expect(noCache2).toEqual(cache2);
    expect(noCache2).toEqual(value2 + increment);

    expect(noCache3).toEqual(cache3);
    expect(noCache3).toEqual(value1 + increment - value2);
  });
});
