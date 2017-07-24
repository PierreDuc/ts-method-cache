import {CacheType} from "../../../core/enum/cache-type.enum";
import {StorageCacheOptions} from "../interface/storage-cache-options";
import {baseCacheDecorator} from "../../../core/decorator/base-cache.decorator";

export function StorageCache<T extends StorageCacheOptions>(options: StorageCacheOptions | string): MethodDecorator {

    return baseCacheDecorator<T>(CacheType.Storage, options as T);

}
