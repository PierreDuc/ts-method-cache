import {createCacheDecorator, normalizeCacheSettings} from "../util/decorator.util";
import {CacheType} from "../enum/cache-type.enum";
import {StorageCacheOptions} from "../interface/storage-cache-options";

export function SessionCache<T extends Function>(options?: StorageCacheOptions | string): MethodDecorator {

    return (target: any, method: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {

        options = normalizeCacheSettings(options!);

        descriptor.value = <T>createCacheDecorator(CacheType.Session, target, <Function>descriptor.value, options);

        return descriptor;

    };
}
