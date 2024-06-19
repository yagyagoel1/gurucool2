class MockRedisClient {
    constructor() {
        this.store = {};
    }

    async get(key) {
        return this.store[key] || null;
    }

    async set(key, value) {
        this.store[key] = value;
    }

    async hGetAll(key) {
        return this.store[key] || null;
    }

    async hSet(key, value) {
        this.store[key] = { ...(this.store[key] || {}), ...value };
    }

    async keys(pattern) {
        const regex = new RegExp(pattern.replace('*', '.*'));
        return Object.keys(this.store).filter(key => regex.test(key));
    }

    async del(key) {
        delete this.store[key];
    }

}

const redisClient = new MockRedisClient();
export default redisClient;
