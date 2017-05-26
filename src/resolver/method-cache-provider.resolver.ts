import {CacheType} from "../enum/cache-type.enum";
import {CacheProvider} from "../interface/cache-provider";
import {MemoryCacheProvider} from "../provider/memory-cache.provider";

const cacheProviders: Map<CacheType, CacheProvider> = new Map();

function createCacheProvider(type): CacheProvider {
    switch (type) {
        case CacheType.Memory:
            return new MemoryCacheProvider();
        default:
            throw `UNKNOWN CACHE PROVIDER: ${type}`;
    }
}

export function getMethodCacheProvider(type: CacheType): CacheProvider {
    if (!cacheProviders.has(type)) {
        cacheProviders.set(type, createCacheProvider(type));
    }
    return <CacheProvider>cacheProviders.get(type);
}
