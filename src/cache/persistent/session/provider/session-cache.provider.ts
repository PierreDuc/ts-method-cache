import { CacheType } from '../../../../core/enum/cache-type.enum';
import { PersistentCacheProvider } from '../../persistent-cache.provider';
import { PersistentStorage } from '../../persistent-storage';
import { SessionCacheOptions } from '../interface/session-cache-options';
import { SessionCacheObject } from '../object/session-cache.object';

export class SessionCacheProvider extends PersistentCacheProvider<SessionCacheObject, SessionCacheOptions> {
  protected cache: SessionCacheObject[] = [];

  protected cacheObjectType: { new (options: SessionCacheOptions): SessionCacheObject } = SessionCacheObject;

  protected cacheType: CacheType = CacheType.Session;

  constructor() {
    super();
    this.storage = new PersistentStorage(this.cacheType);
    this.restoreCacheObjects();
  }
}
