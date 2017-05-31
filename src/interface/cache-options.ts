import {CacheReturnType} from "../enum/cache-return-type.enum";

export interface CacheOptions {

    key?: string;

    ttl?: string|number|Date;

    returnType?: CacheReturnType

}