import {CacheType} from "../enum/cache-type.enum";
import {CacheContainerOptions} from "../interface/cache-container-options";
import {BaseCacheProvider} from "../provider/base-cache.provider";
import {MemoryCacheProvider} from "../../cache/memory/provider/memory-cache.provider";
import {SessionCacheProvider} from "../../cache/session/provider/session-cache.provider";
import {StorageCacheProvider} from "../../cache/storage/provider/storage-cache.provider";

const cacheProviders: Map<CacheType, BaseCacheProvider> = new Map();

const containers: Map<Function, CacheContainerOptions> = new Map();

function createCacheProvider(type: CacheType): BaseCacheProvider {
    switch (type) {
        case CacheType.Memory:
            return new MemoryCacheProvider();
        case CacheType.Session:
            return new SessionCacheProvider();
        case CacheType.Storage:
            return new StorageCacheProvider();
        default:
            throw `UNKNOWN CACHE PROVIDER: ${type}`;
    }
}

export function getMethodCacheProvider<T extends BaseCacheProvider>(type: CacheType): T {
    if (!cacheProviders.has(type)) {
        cacheProviders.set(type, createCacheProvider(type));
    }
    return <T>cacheProviders.get(type);
}

export function setCacheContainer<T extends Function>(container: T, options: CacheContainerOptions): void {
    if (!containers.has(container)) {
        containers.set(container, options);
    }
}

export function getCacheContainer<T extends Function>(container: T): CacheContainerOptions|undefined {
    return containers.get(container);
}
