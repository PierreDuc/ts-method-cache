import {CacheReturnType} from "../enum/cache-return-type.enum";

export interface CacheOptions {

    key?: string;
    returnType?: CacheReturnType
    ttl?: string | number | Date;

}