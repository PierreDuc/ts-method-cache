import {CacheType} from "../enum/cache-type.enum";
import {StorageCacheOptions} from "../interface/storage-cache-options";
import {baseCacheDecorator} from "./base-cache.decorator";

export function SessionCache<T extends Function, U extends StorageCacheOptions>(options: StorageCacheOptions | string): MethodDecorator {

    return baseCacheDecorator<T, U>(CacheType.Session, <U>options);

}
