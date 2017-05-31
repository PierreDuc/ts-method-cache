import 'reflect-metadata';
import * as CircularJSON from 'circular-json';
import {CacheType} from "../enum/cache-type.enum";
import {CacheOptions} from "../interface/cache-options";
import {createGUID} from "./string.util";
import {CacheContainerKey} from "../constant/decorator-keys.constant";
import {getMethodCacheProvider} from "../resolver/method-cache-provider.resolver";
import {CacheReturnType} from "../enum/cache-return-type.enum";
import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheObject} from "../object/cache.object";
import {BaseCacheProvider} from "../provider/base-cache.provider";

export function createCacheDecorator(type: CacheType, target: Object, method: Function, options: CacheOptions): Function {

    const provider: BaseCacheProvider = getMethodCacheProvider(type);

    let container: CacheContainerOptions;

    return function(...args: any[]) {

        const argsString = CircularJSON.stringify(args) || 'void';

        let cacheObject: CacheObject = provider.getCacheObject(options.key!);

        if (!cacheObject) {
            container = container || Reflect.getMetadata(CacheContainerKey, target.constructor);
            cacheObject = provider.createCacheObject(options);
            if (container) {
                provider.addToContainer(container, cacheObject);
            }
        } else if(cacheObject.isExpired(argsString)) {
            provider.clearCacheArgs(cacheObject, argsString);
        }

        if(!cacheObject.hasCache(argsString)) {
            provider.setCache(options, argsString, method.call(this, args));
        }

        return cacheObject.getCache(argsString);
    };
}

export function normalizeCacheSettings(options: CacheOptions|string): CacheOptions {
    if (typeof options === 'string') {
        options = {key: options};
    } else if (!options) {
        options = {key: ''};
    }
    if (!options.key) {
        options.key = createGUID();
    }
    return options;
}