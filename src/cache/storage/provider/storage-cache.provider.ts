import {SessionCacheProvider} from "../../session/provider/session-cache.provider";
import {StorageCacheObject} from "../object/storage-cache.object";
import {StorageCacheOptions} from "../interface/storage-cache-options";

export class StorageCacheProvider extends SessionCacheProvider {

    protected storage: Storage = localStorage;

    protected cache: StorageCacheObject[] = [];

    protected initiateCacheObject(options: StorageCacheOptions): StorageCacheObject {
        return new StorageCacheObject(options);
    }

}