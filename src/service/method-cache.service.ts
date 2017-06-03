import {CacheType} from "../enum/cache-type.enum";
import {getMethodCacheProvider} from "../resolver/method-cache-provider.resolver";

export class MethodCacheService {

    public clearAllCache(): void {
        this.clearMemoryCache();
        this.clearStorageCache();
        this.clearSessionCache();
    }

    public clearMemoryCache(): void {
        this.clearCache(CacheType.Memory);
    }

    public clearMemoryContainer(container: string): void {
        this.clearContainer(CacheType.Memory, container);
    }

    public clearMemoryKeyCache(key: string): void {
        this.clearKeyCache(CacheType.Memory, key);
    }

    public clearSessionCache(): void {
        this.clearCache(CacheType.Session);
    }

    public clearSessionContainer(container: string): void {
        this.clearContainer(CacheType.Session, container);
    }

    public clearSessionKeyCache(key: string): void {
        this.clearKeyCache(CacheType.Session, key);
    }

    public clearStorageCache(): void {
        this.clearCache(CacheType.Storage);
    }

    public clearStorageContainer(container: string): void {
        this.clearContainer(CacheType.Storage, container);
    }

    public clearStorageKeyCache(key: string): void {
        this.clearKeyCache(CacheType.Storage, key);
    }

    private clearCache(type: CacheType): void {
        getMethodCacheProvider(type).clearCache();
    }

    private clearContainer(type: CacheType, container: string): void {
        getMethodCacheProvider(type).clearKeyContainer(container);
    }

    private clearKeyCache(type: CacheType, key: string): void {
        getMethodCacheProvider(type).clearKeyCache(key);
    }

}