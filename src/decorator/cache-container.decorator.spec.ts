import "reflect-metadata";
import {CacheContainerKey} from "../constant/decorator-keys.constant";
import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheContainer} from "./cache-container.decorator";

describe('Cache container decorator is properly set', () => {

    const key: string = 'test';

    @CacheContainer(key)
    class TestCache {
    }

    it("should have metadata options where the key equals the passed key", () => {
        let options: CacheContainerOptions = Reflect.getMetadata(CacheContainerKey, TestCache);
        expect(options.key).toEqual(key);
    });

});