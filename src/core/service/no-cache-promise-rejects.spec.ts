import { MemoryCache } from "../../cache/memory/decorator/memory-cache.decorator";
import { MethodCacheService } from "./method-cache.service";

const msg = "error msg";
const err = () => new Error(msg);
const returnValue = "return value";

class Target {
    public nonThrowingCalled: number = 0;
    public throwingCalled: number = 0;
    public asyncNonThrowingCalled: number = 0;
    public asyncThrowingCalled: number = 0;
    public asyncNonThrowingNoCacheCalled: number = 0;
    public asyncThrowingNoCacheCalled: number = 0;
    public nonImmediateAsyncThrowingNoCacheCalled: number = 0;

    public rejects: ((reason?: any) => void)[] = [];

    @MemoryCache()
    public nonThrowingMethod(): string {
        this.nonThrowingCalled++;
        return returnValue;
    }

    @MemoryCache()
    public throwingMethod(): string {
        this.throwingCalled++;
        throw err();
    }

    @MemoryCache()
    public async asyncNonThrowingMethod(): Promise<string> {
        this.asyncNonThrowingCalled++;
        return returnValue;
    }

    @MemoryCache()
    public async asyncThrowingMethod(): Promise<string> {
        this.asyncThrowingCalled++;
        throw err();
    }

    @MemoryCache({ cacheUntilRejected: true })
    public async asyncNonThrowingNoCacheMethod(): Promise<string> {
        this.asyncNonThrowingNoCacheCalled++;
        return returnValue;
    }

    @MemoryCache({ cacheUntilRejected: true })
    public async asyncThrowingNoCacheMethod(): Promise<string> {
        this.asyncThrowingNoCacheCalled++;
        throw err();
    }

    @MemoryCache({ cacheUntilRejected: true })
    public nonImmediateAsyncThrowingNoCacheMethod(): Promise<string> {
        this.nonImmediateAsyncThrowingNoCacheCalled++;
        return new Promise((resolve, reject) => this.rejects.push(reject));
    }
}

describe("Method cache clears on promise reject", () => {
    const cacheService: MethodCacheService = new MethodCacheService();

    const runMethods = async () => {
        expect(target.nonThrowingMethod()).toEqual(returnValue);
        expect(() => target.throwingMethod()).toThrowError(msg);
        expect(await target.asyncNonThrowingMethod()).toEqual(returnValue);
        try {
            await target.asyncThrowingMethod();
            fail();
        } catch (e) {
            expect(e).toEqual(err());
        }
        expect(await target.asyncNonThrowingNoCacheMethod()).toEqual(returnValue);
        try {
            await target.asyncThrowingNoCacheMethod();
            fail();
        } catch (e) {
            expect(e).toEqual(err());
        }
    };

    let target: Target;

    it("should re-call throwing methods", async () => {
        cacheService.clearAllCache();
        target = new Target();
        for (let i = 0; i < 5; i++) {
            await runMethods();
        }
        expect([
            target.nonThrowingCalled,
            target.throwingCalled,
            target.asyncNonThrowingCalled,
            target.asyncThrowingCalled,
            target.asyncNonThrowingNoCacheCalled,
            target.asyncThrowingNoCacheCalled
        ]).toEqual([1, 5, 1, 1, 1, 5]);

        cacheService.clearAllCache();

        let promises: Promise<string>[] = [];
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());

        expect(target.nonImmediateAsyncThrowingNoCacheCalled).toEqual(1);

        target.rejects.forEach((reject) => reject(msg));

        try {
            await Promise.all(promises);
        } catch (e) {
            expect(e).toEqual(msg);
        }

        promises = [];
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());
        promises.push(target.nonImmediateAsyncThrowingNoCacheMethod());

        expect(target.nonImmediateAsyncThrowingNoCacheCalled).toEqual(2);

        target.rejects.forEach((reject) => reject(msg));

        try {
            await Promise.all(promises);
        } catch (e) {
            expect(e).toEqual(msg);
        }
    });
});
