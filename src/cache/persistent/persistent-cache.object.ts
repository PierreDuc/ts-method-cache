import {CacheReturnType} from '../../core/enum/cache-return-type.enum';
import {BaseCacheObject} from '../../core/object/base-cache.object';
import {PersistentCacheModel} from './persistent-cache-model';
import {PersistentCacheOptions} from './persistent-cache-options';

export abstract class PersistentCacheObject<T extends PersistentCacheOptions> extends BaseCacheObject<T> {

  constructor(options: T) {
    super(options);
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

  public async storeCacheObject(): Promise<PersistentCacheModel<T>> {
    return {
      items: await this.getStorageItems(),
      ttl: this.ttl,
      options: this.options
    }
  }

  private async getStorageItems(): Promise<{ [args: string]: any }> {
    const items: { [args: string]: any } = {};

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
}
