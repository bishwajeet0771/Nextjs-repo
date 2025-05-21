import redisGlobalConfig from "@/app/config/redis.global.config";
import Redis from "ioredis";

class RedisConnectionManager {
  private static instance: RedisConnectionManager;
  private readonly _client: Redis;

  private constructor() {
    this._client = new Redis(redisGlobalConfig);
  }

  public static getInstance(): RedisConnectionManager {
    return (RedisConnectionManager.instance ||= new RedisConnectionManager());
  }

  public getClient(): Redis {
    return this._client;
  }
}

export default RedisConnectionManager.getInstance().getClient();
