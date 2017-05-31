import {CacheReturnType} from "../enum/cache-return-type.enum";
import {CacheOptions} from "../interface/cache-options";
import {CacheContainerObject} from "./cache-container.object";
import {CacheContainerOptions} from "../interface/cache-container-options";

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
        this.items = {};
        this.ttl = {};
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

    public getTtl(): { [args: string]: number } {
        return this.ttl;
    }

    public hasCache(args: string): boolean {
        return this.items.hasOwnProperty(args);
    }

    public isExpired(args: string): boolean {
        return this.ttl.hasOwnProperty(args) && this.ttl[args] < new Date().getTime();
    }

    public mergeOptions(options: CacheContainerOptions): void {
        if (!this.options.returnType) {
            this.options.returnType = options.returnType;
        }
        if (!this.options.ttl) {
            this.options.ttl = options.ttl;
        }
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

    public setCache(args: string, cache: any): void {
        this.items[args] = cache;
        this.setTtl(args);
    }

    public setTtl(args: string): void {
        let ttl: number = this.getTtlFromOptions()!;
        if (ttl) {
            this.ttl[args] = ttl;
        }
    }

    private getTtlFromOptions(): number | undefined {
        let ttl: Date | string | number = this.options.ttl!;
        if (typeof ttl === 'string' && ttl.length > 0) {
            return new Date(ttl).getTime();
        } else if (typeof ttl === 'number' && ttl > 0) {
            return new Date().getTime() + 1000 * ttl;
        } else if (ttl instanceof Date) {
            return ttl.getTime();
        }
    }
}