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

    const key: string = options && options.key || createGUID();

    const provider: CacheProvider = getMethodCacheProvider(type);

    let container: string;

    return function(...args: any[]) {

        const argsString = JSON.stringify(args) || 'void';

        if (!provider.hasCache(key, argsString)) {

            //MethodDecorators are set before ClassDecorators, which means we have to get the container key right here,
            //instead of in the outer scope. But once we got it, there is no need to keep on getting it

            container = container || Reflect.getMetadata(CacheContainerKey, target.constructor);

            provider.setCache(key, argsString, method.call(this, args));
            provider.addToContainer(container, key);
        }

        return provider.getCache(key, argsString);
    };
}