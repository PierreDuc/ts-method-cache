import "reflect-metadata";
import {CacheContainerKey} from "../constant/decorator-keys.constant";
import {CacheContainerOptions} from "../interface/cache-container-options";
import {normalizeCacheSettings} from "../util/decorator.util";

export function CacheContainer<TFunction extends Function>(options: CacheContainerOptions | string): ClassDecorator {

    options = normalizeCacheSettings(options);

    return function (target: TFunction): TFunction {

        Reflect.defineMetadata(CacheContainerKey, options, target);

        return target;
    }
}