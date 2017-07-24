import {CacheType} from "../enum/cache-type.enum";
import {CacheContainerOptions} from "../interface/cache-container-options";
import {BaseCacheOptions} from "../interface/base-cache-options";
import {BaseCacheObject} from "../object/base-cache.object";
import {BaseCacheProvider} from "../provider/base-cache.provider";
import {getCacheContainer, getMethodCacheProvider, setCacheContainer} from "../resolver/method-cache-provider.resolver";
import {createGUID} from "./string.util";

export function createCacheDecorator<T extends Function>(type: CacheType, target: Object, method: T, options: BaseCacheOptions): T {

    const provider: BaseCacheProvider = getMethodCacheProvider(type);

    let container: CacheContainerOptions;

    return <any>function (...args: any[]): any {

        const argsString: string = JSON.stringify(args) || 'void';

        let cacheObject: BaseCacheObject = provider.getCacheObject(options.key!);

        if (!cacheObject) {
            container = container || getCacheContainer(target.constructor);
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

export function createCacheContainerDecorator(options: CacheContainerOptions): ClassDecorator {

    return function (target: any): any {

        setCacheContainer(target, options);

        return target;
    }
}

export function normalizeCacheSettings<U extends BaseCacheOptions>(options: U | string): U {
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

export function normalizeCacheContainerSettings(options: CacheContainerOptions|string): CacheContainerOptions {
    return normalizeCacheSettings<CacheContainerOptions>(options);
}