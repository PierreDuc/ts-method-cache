import {CacheReturnType} from "../enum/cache-return-type.enum";
import {CacheOptions} from "./cache-options";

export interface StorageCacheOptions extends CacheOptions {

    returnType?: CacheReturnType;

}