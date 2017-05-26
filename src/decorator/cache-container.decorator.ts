import 'reflect-metadata';
import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheContainerKey} from "../constant/decorator-keys.constant";
import {createGUID} from "../util/string.util";

export function CacheContainer<TFunction extends Function>(options: CacheContainerOptions): ClassDecorator {

    const key: string = options && options.key || createGUID();

    return function(target: TFunction): TFunction {

        Reflect.defineMetadata(CacheContainerKey, key, target);

        return target;
    }
}