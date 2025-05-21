import Redis from "ioredis";

import redisConnection from "./redis.connection";
import { SlugsType } from "@/app/common/constatns/slug.constants";
import { getPagesSlugs } from "@/app/seo/api";

class RedisService {
  private static instance: RedisService;
  public client: Redis;

  // Private constructor to prevent instantiation outside the class
  private constructor() {
    this.client = redisConnection;
  }

  /**
   * Get the singleton instance of RedisService
   * @returns RedisService instance
   */
  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      console.log("new instance");
      RedisService.instance = new RedisService();
    }
    console.log("old instance");
    return RedisService.instance;
  }

  /**
   * Save a value in Redis.
   * @param key The key for the value.
   * @param value The value to store.
   * @param ttl The TTL in seconds (optional).
   */
  async setKey(key: string, value: string, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await this.client.set(key, value, "EX", ttl);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      console.error("Error saving key in Redis:", error);
      throw new Error("Error saving key in Redis");
    }
  }

  /**
   * Retrieve a value from Redis by key.
   * @param key The key for the value.
   * @returns The stored value or null if not found.
   */
  async getKey(key: string): Promise<string | null> {
    try {
      const result = await this.client.get(key);
      return result;
    } catch (error) {
      console.error("Error retrieving key from Redis:", error);
      return null;
    }
  }

  /**
   * Delete a key from Redis.
   * @param key The key to delete.
   * @returns The number of deleted keys (1 if successful, 0 if not).
   */
  async deleteKey(key: string): Promise<number> {
    try {
      const result = await this.client.del(key);
      return result;
    } catch (error) {
      console.error("Error deleting key from Redis:", error);
      throw new Error("Error deleting key from Redis");
    }
  }

  /**
   * Check if a key exists in Redis.
   * @param key The key to check.
   * @returns True if the key exists, false otherwise.
   */
  async existsKey(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      return result === 1; // Redis returns 1 if the key exists, 0 if not
    } catch (error) {
      console.error("Error checking key existence in Redis:", error);
      return false;
    }
  }

  /**
   * Set a hash field value in Redis.
   * @param hash The hash name.
   * @param field The field name within the hash.
   * @param value The value to store.
   */
  async setHashField(
    hash: string,
    field: string,
    value: string
  ): Promise<void> {
    try {
      await this.client.hset(hash, field, value);
    } catch (error) {
      console.error("Error setting hash field in Redis:", error);
      throw new Error("Error setting hash field in Redis");
    }
  }

  /**
   * Get a hash field value from Redis.
   * @param hash The hash name.
   * @param field The field name within the hash.
   * @returns The value of the field or null if not found.
   */
  async getHashField(hash: string, field: string): Promise<string | null> {
    try {
      const result = await this.client.hget(hash, field);
      return result;
    } catch (error) {
      console.error("Error retrieving hash field from Redis:", error);
      return null;
    }
  }
  // Save a slug by type
  async saveSlug(
    type: string,
    key: string,
    value: any,
    ttl?: number
  ): Promise<void> {
    const fullKey = `${type}:slug:${key}`;
    await this.setKey(fullKey, JSON.stringify(value), ttl);
  }

  async getSlug(type: string, key: string): Promise<any | null> {
    const fullKey = `${type}:slug:${key}`;
    const value = await this.getKey(fullKey);
    if (!value) {
      console.log(type);
      switch (key) {
        case SlugsType.BUILDER:
          var res = await getPagesSlugs("builder-list");
          this.saveSlug(type, key, res);
          return res;
          // break;
        case SlugsType.LISTING: {
          var resp = await getPagesSlugs("listing-search-seo");
          this.saveSlug(type, key, resp);
          return resp;
          // break;
        }
        case SlugsType.PROJECT: {
          const res = await getPagesSlugs("project-list");
          this.saveSlug(type, key, res);
          return res;
        }
        case SlugsType.SEO: {
          const res = await getPagesSlugs("case-seo");
          this.saveSlug(type, key, res);
          return res;
        }

        default:
          console.log("No matching slug type found");
          break;
      }
      return;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error("Error parsing slug value from Redis:", error);
      return null;
    }
  }

  // Save SEO slug
  async saveSeoSlug(
    key: string,
    value: string,
    ttl: number = 172800
  ): Promise<void> {
    const fullKey = `${SlugsType.STATIC}:slug:${key}`;
    const exists = await this.existsKey(fullKey);
    if (!exists) {
      console.log(`case-seo saved in redis succesfully`);
      await this.saveSlug(SlugsType.STATIC, key, value, ttl);
    }

  }

  // Get SEO slug
  async getSeoSlug(key: string): Promise<string[]> {
    const result = await this.getSlug(SlugsType.STATIC, key);
    if (!result) return [];
    return result as string[];
  }

  // Save Listing slug
  async saveListingSlug(
    key: string,
    value: string,
    ttl?: number
  ): Promise<void> {
    await this.saveSlug(SlugsType.STATIC, key, value, ttl);
  }

  // Get Listing slug
  async getListingSlug(key: string): Promise<any | null> {
    return (await this.getSlug(SlugsType.STATIC, key)) || {};
  }

  // Save Builder slug
  async saveBuilderSlug(
    key: string,
    value: string,
    ttl?: number
  ): Promise<void> {
    await this.saveSlug(SlugsType.STATIC, key, value, ttl);
  }

  // Get Builder slug
  async getBuilderSlug(key: string): Promise<any | null> {
    return await this.getSlug(SlugsType.STATIC, key);
  }

  // Save Project slug
  async saveProjectSlug(
    key: string,
    value: string,
    ttl?: number
  ): Promise<void> {
    await this.saveSlug(SlugsType.STATIC, key, value, ttl);
  }

  // Get Project slug
  async getProjectSlug(key: string): Promise<any | null> {
    return await this.getSlug(SlugsType.STATIC, key);
  }
}

export default RedisService.getInstance();
