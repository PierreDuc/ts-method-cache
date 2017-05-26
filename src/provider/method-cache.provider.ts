import {CacheType} from "../enum/cache-type.enum";
import {getMethodCacheProvider} from "../resolver/method-cache-provider.resolver";

export class MethodCacheProvider {

    public clearAllCache(): void {
        this.clearMemoryCache();
    }

    public clearCache(type: CacheType): void {
        getMethodCacheProvider(type).clearCache();
    }

    public clearContainer(type: CacheType, container: string): void {
        getMethodCacheProvider(type).clearContainer(container);
    }

    public clearKeyCache(type: CacheType, key: string): void {
        getMethodCacheProvider(type).clearKeyCache(key);
    }

    public clearMemoryContainer(container: string): void {
        this.clearContainer(CacheType.Memory, container);
    }

    public clearMemoryCache(): void {
        this.clearCache(CacheType.Memory);
    }

    public clearMemoryKeyCache(key: string): void {
        this.clearKeyCache(CacheType.Memory, key);
    }

}