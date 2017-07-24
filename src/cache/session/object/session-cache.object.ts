import {BaseCacheObject} from "../../../core/object/base-cache.object";
import {CacheReturnType} from "../../../core/enum/cache-return-type.enum";
import {StorageCacheModel} from "../../storage/model/storage-cache-model";

export class SessionCacheObject extends BaseCacheObject {

    public async getStorageItems(): Promise<any> {
        let items: { [args: string]: any } = {};
        await Promise.all(Object.keys(this.items).map(async (item: string) => {
            switch (this.returnType) {
                case CacheReturnType.Promise:
                    items[item] = await this.items[item];
                    break;
                case CacheReturnType.Static:
                default:
                    items[item] = this.items[item];
            }
        }));
        return items;
    }

    public restoreCacheObject(items: { [args: string]: any }, ttl: { [args: string]: number }): void {
        this.items = {};
        Object.keys(items).forEach((item: string) => {
            switch (this.returnType) {
                case CacheReturnType.Promise:
                    this.items[item] = Promise.resolve(items[item]);
                    break;
                case CacheReturnType.Static:
                default:
                    this.items[item] = items[item];
            }
        });
        this.ttl = ttl;
    }

    public async storeCacheObject(): Promise<StorageCacheModel> {
        return {
            items: await this.getStorageItems(),
            ttl: this.ttl,
            options: this.options
        }
    }
}