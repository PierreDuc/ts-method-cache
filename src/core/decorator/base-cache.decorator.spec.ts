import { CacheType } from '../enum/cache-type.enum';
import { baseCacheDecorator } from './base-cache.decorator';

const increment: number = 5;

class TestCache {
  public called: number = 0;

  public getterCalled: number = 0;

  public b: number = 0;

  @baseCacheDecorator(CacheType.Memory, {
    calculateCacheKeyFunction: (target: TestCache, args) => {
      return JSON.stringify({ uniqCacheKey: target.b, ...args });
    }
  })
  public sum(a): number {
    return a + this.b;
  }

  @baseCacheDecorator(CacheType.Memory)
  get testGetter(): string {
    this.getterCalled++;
    return 'testGetter';
  }

  @baseCacheDecorator(CacheType.Memory)
  public testMethod(test: number = 0, decrement: number = 0): number {
    this.called++;
    return test + increment - decrement;
  }
}

describe('Cache decorator is properly set', () => {
  let testCache: TestCache;

  beforeEach(() => {
    testCache = new TestCache();
  });

  it('should only call the test method once per argument(s)', () => {
    testCache.testMethod();
    testCache.testMethod();

    testCache.testMethod(1);
    testCache.testMethod(1);

    testCache.testMethod(1, 1);
    testCache.testMethod(1, 1);

    expect(testCache.called).toEqual(3);
  });

  it('should work for a getter', () => {
    const i = testCache.testGetter;
    const ii = testCache.testGetter;

    expect(testCache.getterCalled).toEqual(1);
  });

  it('should not work for a setter', async () => {
    await expect(() => {
      // tslint:disable-next-line:max-classes-per-file
      class TestSetter {
        @baseCacheDecorator(CacheType.Memory)
        set setter(set: string) {
          this._setter = set;
        }

        _setter: string = '';
      }

      const t = new TestSetter();
    }).toThrowError(`Can't set cache decorator on a setter`);
  });

  it('should return the right value for the right argument(s)', () => {
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
  it('if a key calculation method is passed, it is used for calculations', () => {
    const testCache2 = new TestCache();
    testCache.b = 1;
    testCache2.b = 10;

    expect(testCache.sum(1)).toEqual(2);
    expect(testCache2.sum(1)).toEqual(11);
  });
});
