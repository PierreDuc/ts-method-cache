import {CacheContainer} from "../decorator/cache-container.decorator";
import {MethodCacheService} from "../service/method-cache.service";
import {StorageCache} from "../decorator/storage-cache.decorator";
import {CacheReturnType} from "../enum/cache-return-type.enum";


@CacheContainer({key: 'TestContainer', returnType: CacheReturnType.Promise})
export class HttpServiceWithCacheContainer {

    @StorageCache({key: 'GetStuff'})
    public getStuff(stuff: string): Promise<string> {
        console.log("calling stuff: " + stuff);
        return Promise.resolve("returning: " + stuff);
    }

    @StorageCache()
    public getOtherStuff(otherStuff: string): Promise<string> {
        console.log("calling otherStuff: " + otherStuff);
        return Promise.resolve("returning otherStuff: " + otherStuff);
    }

}

let service: HttpServiceWithCacheContainer = new HttpServiceWithCacheContainer();
let cacheService: MethodCacheService = new MethodCacheService();

service.getStuff("books").then(console.log);

setTimeout(() => {
    service.getStuff("books").then((r) => {
        console.log(r);
        cacheService.clearStorageKeyCache('GetStuff');
        service.getStuff("books").then(console.log);
    });
});
