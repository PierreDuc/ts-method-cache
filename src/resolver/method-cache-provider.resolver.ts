import {CacheType} from "../enum/cache-type.enum";
import {BaseCacheProvider} from "../provider/base-cache.provider";
import {MemoryCacheProvider} from "../provider/memory-cache.provider";
import {SessionCacheProvider} from "../provider/session-cache.provider";
import {StorageCacheProvider} from "../provider/storage-cache.provider";

const cacheProviders: Map<CacheType, BaseCacheProvider> = new Map();

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
