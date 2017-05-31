import {CacheContainerOptions} from "../interface/cache-container-options";
import {CacheObject} from "./cache.object";
import {CacheReturnType} from "../enum/cache-return-type.enum";

export class CacheContainerObject {

    public get key(): string {
        return this.options.key!;
    }

    public get returnType(): CacheReturnType {
        return this.options.returnType || CacheReturnType.Static;
    }
    public readonly cacheObjects: CacheObject[] = [];

    constructor(public readonly options: CacheContainerOptions){}

    public addCache(cacheObject: CacheObject): void {
        if (this.cacheObjects.indexOf(cacheObject) === -1) {
            this.cacheObjects.push(cacheObject);
            cacheObject.mergeOptions(this.options);
        }
    }

    public clear(): void {
        this.cacheObjects.forEach(cache => cache.clear());
    }

}