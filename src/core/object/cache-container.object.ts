import { CacheType } from '../enum/cache-type.enum';
import { BaseCacheOptions } from '../interface/base-cache-options';
import { CacheContainerOptions } from '../interface/cache-container-options';
import { BaseCacheObject } from './base-cache.object';

export class CacheContainerObject {
  public readonly cacheObjects: BaseCacheObject<BaseCacheOptions>[] = [];

  public get key(): string {
    return this.options.key;
  }

  constructor(public readonly options: CacheContainerOptions) {}

  public addCache(cacheObject: BaseCacheObject<BaseCacheOptions>): void {
    if (this.cacheObjects.indexOf(cacheObject) === -1) {
      this.cacheObjects.push(cacheObject);
      cacheObject.inheritContainerOptions(this.options);
    }
  }

  public clear(cacheType?: CacheType): void {
    this.cacheObjects.filter((cache) => !cacheType || cache.cacheType === cacheType).forEach((cache) => cache.clear());
  }
}
