import { MemoryCacheObject } from '../../cache/memory/object/memory-cache.object';
import { CacheContainerObject } from './cache-container.object';

describe('Cache Container Object', () => {
  const key: string = 'key';
  const args: string = 'args';
  const value: string = 'value';

  let container: CacheContainerObject;
  let cache: MemoryCacheObject;

  beforeEach(() => {
    container = new CacheContainerObject({ key });
    cache = new MemoryCacheObject({});
    container.addCache(cache);
  });

  it('should set the options key correctly', () => {
    expect(container.key).toEqual(key);
  });

  it('should contain the added cache object', () => {
    expect(container.cacheObjects.length).toEqual(1);
  });

  it('should not add doubles', () => {
    container.addCache(cache);
    expect(container.cacheObjects.length).toEqual(1);
  });

  it('should clear the contained cache objects', () => {
    cache.setCache(args, value);
    expect(cache.getCache(args)).toEqual(value);

    container.clear();
    expect(cache.hasCache(args)).toBeFalsy();
  });
});
