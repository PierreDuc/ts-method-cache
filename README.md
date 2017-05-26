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

    import {MemoryCache} from "ts-method-cache";
    
    export class HttpServiceWithCache {
    
        @MemoryCache()
        public getStuff(stuff: string): Promise<string> {
           return Promise.resolve("stuff: " + stuff);
        }
    
    }
    
This will cache the result of the method for the duration of the application. Refreshing the browser
or restarting the application will clear the cache.

## Todo

This is obviously very much a prototype and there is still a lot of work to be done:

- Expose service to clear and maintain cache
- Create logic to clear certain cache by key
- Create `@CacheContainer()` decorator
- Create logic to clear certain cache by container
- Different caching strategies (`@SessionCache()`, `@StorageCache()`, `@UserCache()`)
- Add TTL option