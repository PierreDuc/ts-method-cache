import {CacheType} from '../enum/cache-type.enum';
import {BaseCacheOptions} from '../interface/base-cache-options';
import {CacheContainerOptions} from '../interface/cache-container-options';
import {BaseCacheObject} from '../object/base-cache.object';
import {CacheContainerObject} from '../object/cache-container.object';

export abstract class BaseCacheProvider<T extends BaseCacheObject<U>, U extends BaseCacheOptions> {

  protected abstract cacheType: CacheType;

  protected abstract cacheObjectType: {new(options: U): T};

  protected cache: T[] = [];

  protected containers: CacheContainerObject[] = [];

  public addToContainer(options: CacheContainerOptions, cacheObject: T): void {
    const container: CacheContainerObject = this.getCacheContainer(options.key!) || this.initiateCacheContainer(options);
    container.addCache(cacheObject);
  }

  public clearCache(): void {
    this.cache.forEach(cache => cache.clear());
    this.clearContainers();
  }

  public clearContainer(container: CacheContainerObject): void {
    container.clear(this.cacheType);
  }

  public clearContainers(): void {
    this.containers.forEach(container => this.clearContainer(container));
  }

  public clearKeyCache(key: string): void {
    const cacheObject: T | undefined = this.getCacheObject(key);
    cacheObject && cacheObject.clear();
  }

  public clearKeyContainer(containerKey: string): void {
    const container: CacheContainerObject = this.getCacheContainer(containerKey);
    container && this.clearContainer(container);
  }

  public createCacheObject(options: U): T {
    return this.getCacheObject(options.key!) || this.initiateCacheObject(options);
  }

  public getCacheObject(key: string): T | undefined {
    return this.cache.find(cache => cache.key === key);
  }

  public setCache(options: U, args: string, cache: any): void {
    this.createCacheObject(options).setCache(args, cache);
  }

  protected getCacheContainer(containerKey: string): CacheContainerObject {
    return this.containers.filter(container => container.key === containerKey)[0];
  }

  protected initiateCacheObject(options: U): T {
    const cacheObject: T = new this.cacheObjectType(options);
    this.cache.push(cacheObject);
    return cacheObject;
  }
  protected initiateCacheContainer(options: CacheContainerOptions): CacheContainerObject {
    const container: CacheContainerObject = new CacheContainerObject(options);
    this.containers.push(container);
    return container;
  }
}
