import {CacheType} from "../enum/cache-type.enum";
import {MemoryCacheProvider} from "../../cache/memory/provider/memory-cache.provider";
import {SessionCacheProvider} from "../../cache/session/provider/session-cache.provider";
import {StorageCacheProvider} from "../../cache/storage/provider/storage-cache.provider";
import {getMethodCacheProvider} from "./method-cache-provider.resolver";

describe('Method cache provider resolver', () => {

    let memoryProvider: MemoryCacheProvider = getMethodCacheProvider<MemoryCacheProvider>(CacheType.Memory);
    let sessionProvider: SessionCacheProvider = getMethodCacheProvider<SessionCacheProvider>(CacheType.Session);
    let storageProvider: StorageCacheProvider = getMethodCacheProvider<StorageCacheProvider>(CacheType.Storage);

    it('should create a memory cache provider', () => {
        expect(memoryProvider instanceof MemoryCacheProvider).toBeTruthy();
    });

    it('should create a session cache provider', () => {
        expect(sessionProvider instanceof SessionCacheProvider).toBeTruthy();
    });

    it('should create a storage cache provider', () => {
        expect(storageProvider instanceof StorageCacheProvider).toBeTruthy();
    });

    it('should only create one provider singleton per type', () => {
        expect(memoryProvider).toEqual(getMethodCacheProvider<MemoryCacheProvider>(CacheType.Memory));
        expect(sessionProvider).toEqual(getMethodCacheProvider<SessionCacheProvider>(CacheType.Session));
        expect(storageProvider).toEqual(getMethodCacheProvider<StorageCacheProvider>(CacheType.Storage));
    });

});