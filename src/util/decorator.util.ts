import 'reflect-metadata';
import {CacheType} from "../enum/cache-type.enum";
import {CacheOptions} from "../interface/cache-options";
import {CacheProvider} from "../interface/cache-provider";
import {createGUID} from "./string.util";
import {CacheContainerKey} from "../constant/decorator-keys.constant";
import {getMethodCacheProvider} from "../resolver/method-cache-provider.resolver";

export function createCacheDecorator(type: CacheType, target: Object, method: Function, options?: CacheOptions|string): Function {

    if (typeof options === 'string') {
        options = {key: options};
    }

    const cacheContainerKey: string = Reflect.getMetadata(CacheContainerKey, target);

    const key: string = options && options.key || createGUID();

    const provider: CacheProvider = getMethodCacheProvider(type);

    return function(...args: any[]) {

        const argsString = JSON.stringify(args) || 'void';

        if (!provider.hasCache(key, argsString)) {
            provider.setCache(key, argsString, method.call(this, args));
            provider.addToContainer(cacheContainerKey, key);
        }

        return provider.getCache(key, argsString);
    };
}