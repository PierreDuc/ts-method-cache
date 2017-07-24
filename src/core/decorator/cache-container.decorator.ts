import {CacheContainerOptions} from "../interface/cache-container-options";
import {createCacheContainerDecorator, normalizeCacheContainerSettings} from "../util/decorator.util";

export function CacheContainer(options: CacheContainerOptions|string): ClassDecorator {

    options = normalizeCacheContainerSettings(options);

    return createCacheContainerDecorator(options);

}