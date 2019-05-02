import {CacheReturnType} from '../enum/cache-return-type.enum';
import {CacheType} from '../enum/cache-type.enum';
import {BaseCacheOptions} from '../interface/base-cache-options';
import {CacheContainerOptions} from '../interface/cache-container-options';

export abstract class BaseCacheObject<T extends BaseCacheOptions> {

  public readonly cacheType: CacheType;

  public get key(): string {
    return this.options.key!;
  }

  public get returnType(): CacheReturnType {
    return this.options.returnType || CacheReturnType.Static;
  }

  protected items: { [args: string]: any } = {};

  protected ttl: { [args: string]: number } = {};

  constructor(public readonly options: T) {
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

    if (!this.options.cacheUntilRejected) {
      this.options.cacheUntilRejected = options.cacheUntilRejected;
    }
  }

  public isExpired(args: string): boolean {
    return this.ttl.hasOwnProperty(args) && this.ttl[args] < Date.now();
  }

  public setCache(args: string, cache: any): void {
    this.items[args] = cache;
    this.setArgsTtl(args);
  }

  private getTtlFromOptions(): number | undefined {
    const ttl: Date | string | number = this.options.ttl!;

    if (typeof ttl === 'string' && ttl.length > 0) {
      return new Date(ttl).getTime() + new Date().getMilliseconds();
    }

    if (typeof ttl === 'number' && ttl > 0) {
      return Date.now() + 1000 * ttl;
    }

    if (ttl instanceof Date) {
      return ttl.getTime();
    }
  }

  private setArgsTtl(args: string): void {
    const ttl: number = this.getTtlFromOptions()!;

    if (ttl) {
      this.ttl[args] = ttl;
    }
  }
}