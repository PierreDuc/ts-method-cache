import {CacheReturnType} from "../enum/cache-return-type.enum";
import {CacheContainerOptions} from "../interface/cache-container-options";
import {BaseCacheObject} from "./base-cache.object";

describe('Cache Object', () => {

    let key: string = 'key';

    let args: string = 'args';

    let cache: string = 'cache';

    let ttl: number = 10;

    describe('default', () => {

        let cacheObject: BaseCacheObject = new BaseCacheObject({key: key});

        it("should have cache after set", () => {
            cacheObject.setCache(args, cache);
            expect(cacheObject.hasCache(args)).toBeTruthy();
        });

        it("should have the same cache as set", () => {
            expect(cacheObject.getCache(args)).toEqual(cache);
        });

        it("should have no cache after clear", () => {
            cacheObject.setCache(args, cache);
            cacheObject.clearArgs(args);
            expect(cacheObject.hasCache(args)).toBeFalsy();

            cacheObject.setCache(args, cache);
            cacheObject.clear();
            expect(cacheObject.hasCache(args)).toBeFalsy();
        });

        it("should not be expired", () => {
            cacheObject.setCache(args, cache);
            expect(cacheObject.isExpired(args)).toBeFalsy();
        });
    });

    describe('TTL', () => {

        describe('using seconds', () => {

            let cacheObject: BaseCacheObject = new BaseCacheObject({key: key, ttl: ttl / 1000});

            it("should not be expired", () => {
                cacheObject.setCache(args, cache);
                expect(cacheObject.isExpired(args)).toBeFalsy();
            });

            it("should be expired", (done) => {
                cacheObject.setCache(args, cache);
                setTimeout(() => {
                    expect(cacheObject.isExpired(args)).toBeTruthy();
                    done();
                }, ttl + 1);
            });
        });

        describe('using date object', () => {

            it("should not be expired", () => {
                let cacheObject: BaseCacheObject = new BaseCacheObject({key: key, ttl: new Date(Date.now() + ttl)});
                cacheObject.setCache(args, cache);
                expect(cacheObject.isExpired(args)).toBeFalsy();
            });

            it("should be expired", (done) => {
                let cacheObject: BaseCacheObject = new BaseCacheObject({key: key, ttl: new Date(Date.now() + ttl)});
                cacheObject.setCache(args, cache);

                setTimeout(() => {
                    expect(cacheObject.isExpired(args)).toBeTruthy();
                    done();
                }, ttl + 1);
            });
        });
    });

    describe('inherit Cache Container Options', () => {

        let options: CacheContainerOptions = {
            key: key,
            returnType: CacheReturnType.Promise,
            ttl: ttl
        };

        it('should inherit the returnType', () => {
            let cacheObject: BaseCacheObject = new BaseCacheObject({key: key});
            cacheObject.inheritContainerOptions(options);
            expect(cacheObject.options.returnType).toEqual(CacheReturnType.Promise);
        });

        it('should inherit the ttl', () => {
            let cacheObject: BaseCacheObject = new BaseCacheObject({key: key});
            cacheObject.inheritContainerOptions(options);
            expect(cacheObject.options.ttl).toEqual(ttl);
        });

        it('should not override the returnType', () => {
            let cacheObject: BaseCacheObject = new BaseCacheObject({key: key, returnType: CacheReturnType.Promise});
            cacheObject.inheritContainerOptions(options);
            expect(cacheObject.options.returnType).toEqual(CacheReturnType.Promise);
        });

        it('should not override the ttl', () => {
            let cacheObject: BaseCacheObject = new BaseCacheObject({key: key, ttl: ttl * 10});
            cacheObject.inheritContainerOptions(options);
            expect(cacheObject.options.ttl).toEqual(ttl * 10);
        });

    });
});