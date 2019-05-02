import {CacheReturnType} from "../enum/cache-return-type.enum";

export interface BaseCacheOptions {
  key?: string;
  returnType?: CacheReturnType;
  ttl?: string | number | Date;
  cacheUntilRejected?: boolean;
}
