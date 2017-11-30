import {baseCacheDecorator} from "../../../../core/decorator/base-cache.decorator";
import {CacheType} from "../../../../core/enum/cache-type.enum";
import {StorageCacheOptions} from "../../storage/interface/storage-cache-options";

export function SessionCache(options: StorageCacheOptions | string): MethodDecorator {

  return baseCacheDecorator<StorageCacheOptions>(CacheType.Session, options);

}
