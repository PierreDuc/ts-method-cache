import { CacheContainerOptions } from '../../core/interface/cache-container-options';

export interface PersistentContainerModel {
  cacheObjects: string[];
  options: CacheContainerOptions;
}
