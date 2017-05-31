import {LocalStorageFolderName} from "../constant/storage-keys.constant";
import {SessionCacheProvider} from "./session-cache.provider";

export class StorageCacheProvider extends SessionCacheProvider {

    protected setStorageVariable(): void {
        if (typeof localStorage === undefined || !localStorage) {
            this.storage = new (require('node-localstorage').LocalStorage)(LocalStorageFolderName);
        } else {
            this.storage = localStorage;
        }
    }
}