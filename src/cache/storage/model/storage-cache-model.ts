import {BaseCacheOptions} from "../../../core/interface/base-cache-options";

export interface StorageCacheModel {

    items: { [args: string]: any };

    options: BaseCacheOptions;

    ttl: { [args: string]: number };
}