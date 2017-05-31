import {CacheType} from "../enum/cache-type.enum";
import {MemoryCacheProvider} from "../provider/memory-cache.provider";
import {StorageCacheProvider} from "../provider/storage-cache.provider";
import {BaseCacheProvider} from "../provider/base-cache.provider";
import {SessionCacheProvider} from "../provider/session-cache.provider";

const cacheProviders: Map<CacheType, BaseCacheProvider> = new Map();

function createCacheProvider(type): BaseCacheProvider {
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

export function getMethodCacheProvider(type: CacheType): BaseCacheProvider {
    if (!cacheProviders.has(type)) {
        cacheProviders.set(type, createCacheProvider(type));
    }
    return <BaseCacheProvider>cacheProviders.get(type);
}
