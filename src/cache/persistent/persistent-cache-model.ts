import {PersistentCacheOptions} from './persistent-cache-options';

export interface PersistentCacheModel<T extends PersistentCacheOptions> {
  items: { [args: string]: any };
  options: T;
  ttl: { [args: string]: number };
}
