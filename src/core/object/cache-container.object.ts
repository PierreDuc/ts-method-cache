import {CacheContainerOptions} from "../interface/cache-container-options";
import {BaseCacheObject} from "./base-cache.object";

export class CacheContainerObject {

    public get key(): string {
        return this.options.key;
    }

    public readonly cacheObjects: BaseCacheObject[] = [];

    constructor(public readonly options: CacheContainerOptions) {
    }

    public addCache(cacheObject: BaseCacheObject): void {
        if (this.cacheObjects.indexOf(cacheObject) === -1) {
            this.cacheObjects.push(cacheObject);
            cacheObject.inheritContainerOptions(this.options);
        }
    }

    public clear(): void {
        this.cacheObjects.forEach(cache => cache.clear());
    }

}