import * as CircularJSON from "circular-json";
import "reflect-metadata";
import {CacheContainerKey} from "../constant/decorator-keys.constant";
import {CacheType} from "../enum/cache-type.enum";
import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheOptions} from "../interface/cache-options";
import {CacheObject} from "../object/cache.object";
import {BaseCacheProvider} from "../provider/base-cache.provider";
import {getMethodCacheProvider} from "../resolver/method-cache-provider.resolver";
import {createGUID} from "./string.util";

export function createCacheDecorator<T extends Function>(type: CacheType, target: Object, method: T, options: CacheOptions): T {

    const provider: BaseCacheProvider = getMethodCacheProvider(type);

    let container: CacheContainerOptions;

    return <any>function (...args: any[]): any {

        const argsString: string = CircularJSON.stringify(args) || 'void';

        let cacheObject: CacheObject = provider.getCacheObject(options.key!);

        if (!cacheObject) {
            container = container || Reflect.getMetadata(CacheContainerKey, target.constructor);
            cacheObject = provider.createCacheObject(options);
            if (container) {
                provider.addToContainer(container, cacheObject);
            }
        } else if (cacheObject.isExpired(argsString)) {
            provider.clearCacheArgs(cacheObject, argsString);
        }

        if (!cacheObject.hasCache(argsString)) {
            provider.setCache(options, argsString, method.call(this, args));
        }

        return cacheObject.getCache(argsString);
    };
}

export function normalizeCacheSettings<U extends CacheOptions>(options: U | string): U {
    if (typeof options === 'string') {
        options = <U>{key: options};
    } else if (!options) {
        options = <U>{key: ''};
    }
    if (!options.key) {
        options.key = createGUID();
    }
    return options;
}