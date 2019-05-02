[![npm](https://img.shields.io/npm/v/ts-method-cache.svg)](https://www.npmjs.com/package/ts-method-cache)
[![Build Status](https://travis-ci.org/PierreDuc/ts-method-cache.svg?branch=master)](https://travis-ci.org/PierreDuc/ts-method-cache)
[![codecov](https://codecov.io/gh/PierreDuc/ts-method-cache/branch/master/graph/badge.svg)](https://codecov.io/gh/PierreDuc/ts-method-cache)

# TypeScript Method Cache

Method cache using decorators for TypeScript. This comes in handy for a quick and easy to implement caching mechanism
for obtaining static data from an API or other databases.

The current storage methods are:

-   Memory Cache _clears after browser refresh or restart_
-   Session Cache _clears after closing the browser (cannot be used inside node, acts like `MemoryCache` if used in node)_
-   Storage Cache _clears after clearing the storage (cannot be used inside node, acts like `MemoryCache` if used in node)_

## Prerequisites

Enable `experimentalDecorators` in your `tsconfig.json`

    {
      "compilerOptions": {
        ...,
        "experimentalDecorators": true
      }
    }

## Installation

Install the module using npm:

    npm install ts-method-cache --save

## Examples

### Simple usage:

    import {MemoryCache} from "ts-method-cache";

    export class HttpServiceWithCache {

        @MemoryCache()
        public getBar(foo: string): Promise<string> {
           return Promise.resolve(stuff + 'bar');
        }

    }

> No changes are needed inside your code to cache the returned value. Only add the decorator to your method, and the return
> value is cached

## Limitations

It's not possible to store complex objects using `StorageCache` or `SessionCache`, like it is using `MemoryCache`. If
the object stored has methods or any other fancy stuff, this will most likely not work.

The only complex return types possible for cache based on Storage is a `Promise`.

## API

### `CacheType`

Enum representing the different Cache Types:

    CacheType.Memory
    CacheType.Session
    CacheType.Storage

### `CacheReturnType`

Enum representing the different Cache Return Types (Only used in Storage cache, not Memory cache):

    CacheType.Static
    CacheType.Promise

### `CacheOptions`

Interface object which you can use to adjust the behaviour of the cache decorator. All decorators support the following
options:

    key?: string;

The key on which this method cache is stored under. Instead of a `CacheOptions` object, you can also just send a string
as parameter in a decorator, and this will be set as the key. You can't adjust the ttl and returnType then. So this is
probably only advised for `@MemoryCache`

    ttl?: string|number|Date

Time to live. This can be a string, a number or Date object.
The string has to be a parsable Date string. The resulting Date is the end date as to how long the cache should live.
The Date object is the end date as to how long the cache should live.
The number is in seconds, and indicates how many seconds the cache is allowed to live its life

    returnType?: CacheReturnType

The `returnType` only has effect on the `@SessionCache` and `@StorageCache` decorators. Because it is impossible to save
the entire `Promise` object inside a Storage object you should tell the decorator your method is returning a `Promise`
by setting this to `CacheReturnType.Promise`.

    cacheUntilRejected?: boolean

When caching a method returning a Promise, this option will clear the relevant cache when the Promise is
rejected. If the Promise resolves normally, the cache persists.

### `MethodCacheService`

Pretty self explanatory method names:

    clearAllCache(): void;
    clearContainer(container: string): void;
    clearKeyCache(type: CacheType, key: string): void;
    clearMemoryContainer(container: string): void;
    clearMemoryCache(): void;
    clearMemoryKeyCache(key: string): void;
    clearStorageContainer(container: string): void;
    clearStorageCache(): void;
    clearStorageKeyCache(key: string): void;
    clearSessionContainer(container: string): void;
    clearSessionCache(): void;
    clearSessionKeyCache(key: string): void;

### `@MemoryCache(options?: CacheOptions|string)`

This will cache the result of the method for the duration of the application. Refreshing the browser
or restarting the application will clear the cache. This is the easiest form of caching, and there are no
restrictions. Which means you can return any object you would like (Promise/Observable/etc...)

Import the `MemoryCache` method decorator from "ts-method-cache" and place it in front or above the method from which you
would like the return result to be cached. Caching is based on the passed parameters to the method itself and an optional
key string you can set as a parameter in the decorator: `@MethodCache(key)`. If the key is omitted, a GUID is generated.
When you don't use a key, be sure to use a `CacheContainer`, because that will be the only way to manage the cache
created on the method.

_Simple usage:_

    import {MemoryCache} from "ts-method-cache";

    export class HttpServiceWithCache {

        @MemoryCache()
        public getStuff(stuff: string): Promise<string> {
           console.log("calling stuff: " + stuff);
           return Promise.resolve("returning stuff: " + stuff);
        }

    }

    const service: HttpServiceWithCache = new HttpServiceWithCache();

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

### `@CacheContainer(options: CacheOptions|string)`

A `CacheContainer` is a class decorator which acts as a container for the method decorators placed on its methods. It
has a mandatory input which can be a key, or a `CacheOptions` object. If you define a `ttl` and/or a `returnType`, then
these values will be used as default values for the method decorators.

### `@MemoryCache` usage with `@CacheContainer`, `CacheOptions` and the `MethodCacheService`:

    @CacheContainer({key: 'TestContainer', ttl: 1})
    export class HttpServiceWithCacheContainer {

        @MemoryCache({key: 'GetStuff', ttl: 5})
        public getStuff(stuff: string): Promise<string> {
            console.log("calling stuff: " + stuff);
            return Promise.resolve("returning: " + stuff);
        }

        @MemoryCache()
        public getOtherStuff(otherStuff: string): Promise<string> {
            console.log("calling otherStuff: " + otherStuff);
            return Promise.resolve("returning otherStuff: " + otherStuff);
        }

    }

    const service: HttpServiceWithCacheContainer = new HttpServiceWithCacheContainer();
    const cacheService: MethodCacheService = new MethodCacheService();

    service.getStuff("books").then(console.log);
    service.getOtherStuff("cds").then(console.log);

    setTimeout(() => {
        service.getStuff("books").then(console.log);
        service.getOtherStuff("cds").then(console.log);
        cacheService.clearMemoryContainer('TestContainer');
        service.getStuff("books").then(console.log);
        service.getOtherStuff("cds").then(console.log);
    }, 3000);

This will result in the following output:

    /** @output
    *   calling stuff: books
    *   calling otherStuff: cds
    *   returning: books
    *   returning otherStuff: cds
    *   calling otherStuff: cds
    *   calling stuff: books
    *   calling otherStuff: cds
    *   returning: books
    *   returning otherStuff: cds
    *   returning: books
    *   returning otherStuff: cds
    */

This output is a bit harder to follow, but what happens is that by using a `ttl` inside the cache container, any method
decorator that does not have a ttl will inherit this ttl. (Same goes for `returnType` in the Storage decorators). This
results in calling the actual `otherStuff` method 3 times, because it expires after 1 second, and the `stuff` method
only twice, because this cache expires after 5 seconds.

The `clearMemoryContainer` clears all the cache present in the `CacheContainer`.

### `@SessionCache(options: CacheOptions | string)`

This uses the browser's native `SessionStorage`. Therefor it is limited to the browser environment only. And with it comes
the limitations of storage. You can only store static objects or Promises using this decorator. To store a promise, set
the `returnType` property of the `StorageCacheOptions` to `CacheReturnType.Promise`. The return type defaults to `Static`.

You can also set the `returnType` as part of a `CacheContainer`. A method decorator will inherit this `returnType`.

The rest is the same as `@MethodCache`

### `@StorageCache(options: CacheOptions | string)`

The same as `@SessionCache`, but instead of the browser's native `SessionStorage` it uses the `LocalStorage` of the
browser. This can only be used inside the browser.
