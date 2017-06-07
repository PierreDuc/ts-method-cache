import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import {CacheReturnType} from "../enum/cache-return-type.enum";
import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheOptions} from "../interface/cache-options";
import {StorageCacheObject} from "../interface/storage-cache-object";

export class CacheObject {

    public get key(): string {
        return this.options.key!;
    }

    public get returnType(): CacheReturnType {
        return this.options.returnType || CacheReturnType.Static;
    }

    private items: { [args: string]: any } = {};

    private ttl: { [args: string]: number } = {};

    constructor(public readonly options: CacheOptions) {
    }

    public clear(): void {
        Object.keys(this.items).forEach(args => this.clearArgs(args));
    }

    public clearArgs(args: string): void {
        delete this.items[args];
        delete this.ttl[args];
    }

    public getCache(args: string): any {
        return this.items[args];
    }

    public async getStorageItems(): Promise<any> {
        let items: { [args: string]: any } = {};
        await Promise.all(Object.keys(this.items).map(async (item: string) => {
            switch (this.returnType) {
                case CacheReturnType.Observable:
                    items[item] = await this.items[item].toPromise();
                    break;
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

    public hasCache(args: string): boolean {
        return this.items.hasOwnProperty(args);
    }

    public inheritContainerOptions(options: CacheContainerOptions): void {
        if (!this.options.returnType) {
            this.options.returnType = options.returnType;
        }
        if (!this.options.ttl) {
            this.options.ttl = options.ttl;
        }
    }

    public isExpired(args: string): boolean {
        return this.ttl.hasOwnProperty(args) && this.ttl[args] < Date.now();
    }

    public restoreCacheObject(items: { [args: string]: any }, ttl: { [args: string]: number }): void {
        this.items = {};
        Object.keys(items).forEach((item: string) => {
            switch (this.returnType) {
                case CacheReturnType.Observable:
                    this.items[item] = Observable.create((observer: Subscriber<string>) => {
                        observer.next(items[item]);
                        observer.complete();
                    });
                    break;
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

    public setCache(args: string, cache: any): void {
        this.items[args] = cache;
        this.setArgsTtl(args);
    }

    public async storeCacheObject(): Promise<StorageCacheObject> {
        return {
            items: await this.getStorageItems(),
            ttl: this.ttl,
            options: this.options
        }
    }

    private getTtlFromOptions(): number | undefined {
        let ttl: Date | string | number = this.options.ttl!;
        if (typeof ttl === 'string' && ttl.length > 0) {
            return new Date(ttl).getTime();
        } else if (typeof ttl === 'number' && ttl > 0) {
            return Date.now() + 1000 * ttl;
        } else if (ttl instanceof Date) {
            return ttl.getTime();
        }
    }

    private setArgsTtl(args: string): void {
        let ttl: number = this.getTtlFromOptions()!;
        if (ttl) {
            this.ttl[args] = ttl;
        }
    }
}