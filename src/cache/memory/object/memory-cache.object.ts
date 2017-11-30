import {CacheType} from '../../../core/enum/cache-type.enum';
import {BaseCacheObject} from "../../../core/object/base-cache.object";
import {MemoryCacheOptions} from '../interface/memory-cache-options';

export class MemoryCacheObject extends BaseCacheObject<MemoryCacheOptions> {

  public readonly cacheType: CacheType = CacheType.Memory;

  constructor(options: MemoryCacheOptions) {
    super(options);
  }

}
