import {CacheType} from "../enum/cache-type.enum";
import {StorageCacheOptions} from "../interface/storage-cache-options";
import {baseCacheDecorator} from "./base-cache.decorator";

export function StorageCache<T extends Function, U extends StorageCacheOptions>(options: StorageCacheOptions | string): MethodDecorator {

    return baseCacheDecorator<T, U>(CacheType.Storage, <U>options);

}
