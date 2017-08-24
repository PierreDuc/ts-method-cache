import {Observable} from 'rxjs';
import {MemoryCache} from "../../src/";
import {CacheContainer} from "../../src/core/decorator/cache-container.decorator";
import {MethodCacheService} from "../../src/core/service/method-cache.service";

@CacheContainer('hii')
class TestThis {

    @MemoryCache()
    public methodTest(paramA: string, paramB: string, paramC: number): Observable<number> {
        console.log(paramA);
        console.log(paramB);
        console.log(paramC);
        return Observable.create(observer=>observer.next(paramA + paramC + paramB));
    }

}

let test = new TestThis();
let obs = test.methodTest('stringA', 'stringB', 2);
let obs3 = test.methodTest('stringA', 'stringB', 2);
let cache = new MethodCacheService();
cache.clearMemoryContainer('hii');
let obs2 = test.methodTest('stringA', 'stringB', 2);
obs.subscribe((res) => {
   console.log(res);
});
obs3.subscribe((res) => {
   console.log(res);
});
obs2.subscribe((res) => {
   console.log(res);
});
