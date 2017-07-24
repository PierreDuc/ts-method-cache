import {BaseCacheOptions} from "../interface/base-cache-options";
import {normalizeCacheSettings} from "./decorator.util";

describe('Decorators Util', () => {

    describe('Proper CacheSetting normalization, normalizeCacheSettings', () => {

        let key: string = 'key';

        it("should make the options object always to have a key set", () => {
            let options: BaseCacheOptions = normalizeCacheSettings<BaseCacheOptions>({});
            expect(options && options.key && options.key.length).toBeGreaterThan(0);
        });

        it("should make the options have the same key as passed as a string", () => {
            let options: BaseCacheOptions = normalizeCacheSettings<BaseCacheOptions>(key);
            expect(options && options.key).toEqual(key);
        });

        it("should make the options have the same key as passed as a object", () => {
            let options: BaseCacheOptions = normalizeCacheSettings<BaseCacheOptions>({key: key});
            expect(options && options.key).toEqual(key);
        });
    });

});