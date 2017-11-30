import {CacheContainerOptions} from "../interface/cache-container-options";
import {getCacheContainer} from "../resolver/method-cache-provider.resolver";
import {CacheContainer} from "./cache-container.decorator";

describe('Cache container decorator is properly set', () => {

  const key: string = 'test';

  @CacheContainer(key)
  class TestCache {
  }

  it("should have a cache container options where the key equals the passed key", () => {
    const options: CacheContainerOptions = getCacheContainer(TestCache) as CacheContainerOptions;
    expect(options.key).toEqual(key);
  });

});