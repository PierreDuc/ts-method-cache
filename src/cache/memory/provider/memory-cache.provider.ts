import {BaseCacheProvider} from "../../../core/provider/base-cache.provider";
import {MemoryCacheObject} from "../object/memory-cache.object";
import {MemoryCacheOptions} from "../interface/memory-cache-options";

export class MemoryCacheProvider extends BaseCacheProvider {

    protected cache: MemoryCacheObject[] = [];

    protected initiateCacheObject(options: MemoryCacheOptions): MemoryCacheObject {
        return new MemoryCacheObject(options);
    }

}