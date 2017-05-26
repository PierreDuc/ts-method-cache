import {CacheOptions} from "../interface/cache-options";
import {createCacheDecorator} from "../util/decorator.util";
import {CacheType} from "../enum/cache-type.enum";

export function MemoryCache<T extends Function>(options?: CacheOptions|string): MethodDecorator {

    return (target: any, key: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> => {

        descriptor.value = <T>createCacheDecorator(CacheType.Memory, target, <Function>descriptor.value, options);

        return descriptor;

    };
}
