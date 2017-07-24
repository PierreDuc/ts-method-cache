import {CacheReturnType} from "../../../core/enum/cache-return-type.enum";
import {BaseCacheOptions} from "../../../core/interface/base-cache-options";

export interface SessionCacheOptions extends BaseCacheOptions {

    returnType?: CacheReturnType;

}