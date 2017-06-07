import {CacheOptions} from "../interface/cache-options";
import {normalizeCacheSettings} from "./decorator.util";

describe('Decorators Util', () => {

    describe('Proper CacheSetting normalization, normalizeCacheSettings', () => {

        let key: string = 'key';

        it("should make the options object always to have a key set", () => {
            let options: CacheOptions = normalizeCacheSettings<CacheOptions>({});
            expect(options && options.key && options.key.length).toBeGreaterThan(0);
        });

        it("should make the options have the same key as passed as a string", () => {
            let options: CacheOptions = normalizeCacheSettings<CacheOptions>(key);
            expect(options && options.key).toEqual(key);
        });

        it("should make the options have the same key as passed as a object", () => {
            let options: CacheOptions = normalizeCacheSettings<CacheOptions>({key: key});
            expect(options && options.key).toEqual(key);
        });
    });

});