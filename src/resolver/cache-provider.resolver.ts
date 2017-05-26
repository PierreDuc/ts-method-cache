import {CacheType} from "../enum/cache-type.enum";
import {MemoryCacheProvider} from "../provider/memory-cache.provider";
import {CacheProvider} from "../interface/cache-provider";

export class CacheProviderResolver {

    private static cacheProviders: Map<CacheType, CacheProvider> = new Map();

    public static getCacheProvider(type: CacheType): CacheProvider {
        if (!this.cacheProviders.has(type)) {
            this.cacheProviders.set(type, CacheProviderResolver.createCacheProvider(type));
        }
        return <CacheProvider>this.cacheProviders.get(type);
    }

    public static getMemoryCacheProvider(): MemoryCacheProvider {
        return <MemoryCacheProvider>this.getCacheProvider(CacheType.Memory);
    }

    private static createCacheProvider(type): CacheProvider {
        switch (type) {
            case CacheType.Memory:
                return new MemoryCacheProvider();
            default:
                throw `UNKNOWN CACHE PROVIDER: ${type}`;
        }
    }

}