import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheContainer} from "./cache-container.decorator";
import {getCacheContainer} from "../resolver/method-cache-provider.resolver";

describe('Cache container decorator is properly set', () => {

    const key: string = 'test';

    @CacheContainer(key)
    class TestCache {
    }

    it("should have a cache container options where the key equals the passed key", () => {
        let options: CacheContainerOptions = getCacheContainer(TestCache) as CacheContainerOptions;
        expect(options.key).toEqual(key);
    });

});