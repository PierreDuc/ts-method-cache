import { CacheType } from '../../../../core/enum/cache-type.enum';
import { PersistentCacheObject } from '../../persistent-cache.object';
import { SessionCacheOptions } from '../interface/session-cache-options';

export class SessionCacheObject extends PersistentCacheObject<SessionCacheOptions> {
  public readonly cacheType: CacheType = CacheType.Session;
}
