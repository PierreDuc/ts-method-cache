# TypeScript Method Cache

Method cache using decorators for TypeScript. This comes in handy for a quick and easy to implement caching mechanism 
for obtaining static data from an API or other database.

## Prerequisites

Enable `emitDecoratorMetadata` and `experimentalDecorators` in your `tsconfig.json`

    {
      "compilerOptions": {
        ...
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        ...
    }

## Installation

Install the module using npm:

    npm install ts-method-cache --save
    
    
## Usage

Import the `MemoryCache` method decorator and place it in front of the method from which you would like the return 
result to be cached. Caching is based on the passed parameters to the method and an optional key string you can set as 
a parameter in the decorator:  `@MethodCache(key)`. If the key is omitted, an GUID is generated. 

Be aware though that you have no control and no means (yet) to access said cache if you do not pass a key. 

- `@MemoryCache`
This will cache the result of the method for the duration of the application. Refreshing the browser
or restarting the application will clear the cache.

*Simple usage:*

    import {MemoryCache} from "ts-method-cache";
    
    export class HttpServiceWithCache {
    
        @MemoryCache()
        public getStuff(stuff: string): Promise<string> {
           console.log("calling stuff: ", stuff);
           return Promise.resolve("returning stuff: " + stuff);
        }
    
    }
    
    let service: HttpServiceWithCache = new HttpServiceWithCache();
    
    service.getStuff("books").then(console.log);
    service.getStuff("books").then(console.log);    
    service.getStuff("cds").then(console.log);    
    service.getStuff("cds").then(console.log);    
    
This will result in the following output:

    /** @output
    *  calling stuff: books
    *  calling stuff: cds
    *  returning stuff: books
    *  returning stuff: books
    *  returning stuff: cds
    *  returning stuff: cds
    */
    
As you can see the actual method is only called twice, while returning four times. It's magic!
    
*Usage with `@CacheContainer` and the `MethodCacheProvider`:*


    import {MemoryCache, CacheContainer, MethodCacheProvider} from "ts-method-cache";
    
    @CacheContainer({key: 'TestContainer'})
    export class HttpServiceWithCacheContainer {
    
        @MemoryCache()
        public getStuff(stuff: string): Promise<string> {
           console.log("calling stuff: ", stuff);
           return Promise.resolve("returning: " + stuff);
        }
    
         @MemoryCache()
         public getOtherStuff(otherStuff: string): Promise<string> {
            console.log("calling otherStuff: ", stuff);
            return Promise.resolve("returning otherStuff: " + otherStuff);
         }
     
   }
    
    let service: HttpServiceWithCacheContainer = new HttpServiceWithCacheContainer();
    let provider: MethodCacheProvider = new MethodCacheProvider();
    
    service.getStuff("books").then(console.log);
    service.getOtherStuff("cds").then(console.log);
    
    setTimeout(() => {
    
        provider.clearMemoryContainer('TestContainer');
        service.getStuff("books").then(console.log);
        service.getOtherStuff("cds").then(console.log);
    
    });

This will result in the following output:
   
   /** @output
   *  calling stuff: books
   *  calling otherStuff: cds
   *  returning stuff: books
   *  returning otherStuff: cds
   *  calling stuff: books
   *  calling otherStuff: cds
   *  returning stuff: books
   *  returning otherStuff: cds
   */
       
As you can see the entire cache of the container is cleared using `clearMemoryContainer` and the original method is
called again and stored in the cache.

The `MethodCacheProvider` has several nice methods you can use, where for now the only available `CacheType` the 
`CacheType.Memory` is:

    clearAllCache(): void;
    clearCache(type: CacheType): void;
    clearContainer(type: CacheType, container: string): void;
    clearKeyCache(type: CacheType, key: string): void;
    clearMemoryContainer(container: string): void;
    clearMemoryCache(): void;
    clearMemoryKeyCache(key: string): void;


## Todo

This is obviously very much a prototype and there is still a lot of work to be done:

- Different caching strategies (`@SessionCache()`, `@StorageCache()`, `@UserCache()`)
- Add TTL option