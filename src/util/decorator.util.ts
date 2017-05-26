import {CacheType} from "../enum/cache-type.enum";
import {CacheOptions} from "../interface/cache-options";
import {CacheProvider} from "../interface/cache-provider";
import {CacheProviderResolver} from "../resolver/cache-provider.resolver";
import {createGUID} from "./string.util";

export function createCacheDecorator(type: CacheType, method: Function, options?: CacheOptions|string): Function {

    if (typeof options === 'string') {
        options = {key: options};
    }

    const key: string = options && options.key || createGUID();

    const provider: CacheProvider = CacheProviderResolver.getCacheProvider(type);

    return function(...args: any[]) {

        const argsString = JSON.stringify(args) || 'void';

        if (!provider.hasCache(key, argsString)) {
            provider.setCache(key, argsString, method.call(this, args));
        }

        return provider.getCache(key, argsString);
    };
}