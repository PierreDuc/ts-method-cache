import {CacheContainerObject} from "./cache-container.object";
import {CacheObject} from "./cache.object";

describe('Cache Container Object', () => {

    let key: string = 'key';

    let args: string = 'args';

    let cache: string = 'cache';

    it('should contain the added cache object', () => {
        let container: CacheContainerObject = new CacheContainerObject({key: key});
        let cache: CacheObject = new CacheObject({});
        container.addCache(cache);
        expect(container.cacheObjects.length).toEqual(1);
    });

    it('should not add doubles', () => {
        let container: CacheContainerObject = new CacheContainerObject({key: key});
        let cache: CacheObject = new CacheObject({});
        container.addCache(cache);
        container.addCache(cache);
        expect(container.cacheObjects.length).toEqual(1);
    });

    it('should clear the contained cache objects', () => {
        let container: CacheContainerObject = new CacheContainerObject({key: key});
        let cache: CacheObject = new CacheObject({});
        container.addCache(cache);
        cache.setCache(args, cache);
        expect(cache.getCache(args)).toEqual(cache);
        container.clear();
        expect(cache.hasCache(args)).toBeFalsy();
    });
});