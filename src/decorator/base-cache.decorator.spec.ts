import {CacheType} from "../enum/cache-type.enum";
import {baseCacheDecorator} from "./base-cache.decorator";

describe('Cache decorator is properly set', () => {

    class TestCache {

        public called: number = 0;

        @baseCacheDecorator(CacheType.Memory)
        public testMethod(): void {
            this.called++;
        }

    }

    let testCache: TestCache = new TestCache();

    it("should only call the test method once", () => {
        testCache.testMethod();
        testCache.testMethod();
        expect(testCache.called).toEqual(1);
    });

});