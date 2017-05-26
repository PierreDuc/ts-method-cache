export abstract class BaseCacheProvider {

    public readonly containers: Map<string, string[]> = new Map();

    public clearContainer(container: string): void {
        if (this.containers.has(container)) {
            this.containers.get(container)!.forEach(key => this.clearKeyCache(key));
        }
    }
    
    public addToContainer(container: string, key: string): void {
        if (typeof container !== 'string') {
            container = key;
        }
        if (!this.containers.has(container)) {
            this.containers.set(container, []);
        }
        let keys: string[] = this.containers.get(container)!;
        if (keys.indexOf(key) === -1) {
            keys.push(key);
        }
    }

    public clearKeyCache(key: string): void {}

}