import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheObject} from "./cache.object";

export class CacheContainerObject {

    public get key(): string {
        return this.options.key;
    }

    public readonly cacheObjects: CacheObject[] = [];

    constructor(public readonly options: CacheContainerOptions) {
    }

    public addCache(cacheObject: CacheObject): void {
        if (this.cacheObjects.indexOf(cacheObject) === -1) {
            this.cacheObjects.push(cacheObject);
            cacheObject.inheritContainerOptions(this.options);
        }
    }

    public clear(): void {
        this.cacheObjects.forEach(cache => cache.clear());
    }

}