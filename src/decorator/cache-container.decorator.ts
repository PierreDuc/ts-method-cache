import 'reflect-metadata';
import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheContainerKey} from "../constant/decorator-keys.constant";
import {createGUID} from "../util/string.util";
import {normalizeCacheSettings} from "../util/decorator.util";

export function CacheContainer<TFunction extends Function>(options: CacheContainerOptions|string): ClassDecorator {

    options = normalizeCacheSettings(options);

    return function(target: TFunction): TFunction {

        Reflect.defineMetadata(CacheContainerKey, options, target);

        return target;
    }
}