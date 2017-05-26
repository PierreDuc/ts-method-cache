import {CacheContainer} from "../decorator/cache-container.decorator";
import {MemoryCache} from "../decorator/memory-cache.decorator";
import {MethodCacheProvider} from "../provider/method-cache.provider";

@CacheContainer({key: 'testthis'})
class TestThis {

    @MemoryCache()
    public getStuff(stuff?: string): Promise<string> {
        console.log("Getting: " + stuff);
        return Promise.resolve("stuff: " + stuff);
    }

}

let memoryHandler: MethodCacheProvider = new MethodCacheProvider();

let test: TestThis = new TestThis();

test.getStuff('that').then(console.log);

setTimeout(() => {

    memoryHandler.clearMemoryContainer('testthis');
    test.getStuff('that').then(console.log);

}, 500);