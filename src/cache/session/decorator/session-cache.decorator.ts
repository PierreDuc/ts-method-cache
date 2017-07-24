import {CacheType} from "../../../core/enum/cache-type.enum";
import {StorageCacheOptions} from "../../storage/interface/storage-cache-options";
import {baseCacheDecorator} from "../../../core/decorator/base-cache.decorator";

export function SessionCache<T extends StorageCacheOptions>(options: StorageCacheOptions | string): MethodDecorator {

    return baseCacheDecorator<T>(CacheType.Session, options as T);

}
