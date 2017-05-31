import {CacheOptions} from "./cache-options";
import {CacheReturnType} from "../enum/cache-return-type.enum";

export interface StorageCacheOptions extends  CacheOptions {

    returnType?: CacheReturnType;

}