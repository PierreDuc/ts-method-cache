import {CacheOptions} from "./cache-options";

export interface StorageCacheObject {

    items: { [args: string]: any };

    options: CacheOptions;

    ttl: { [args: string]: number };
}