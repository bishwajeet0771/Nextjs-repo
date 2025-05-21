class RedisConfig {
  private static instance: RedisConfig;
  public readonly host: string;
  public readonly port: number;
  public readonly password: string; // Made required by removing optional
  public readonly connectTimeout: number;
  public readonly maxRetriesPerRequest: number;
  public readonly enableReadyCheck: boolean;
  public readonly lazyConnect: boolean;
  public readonly basePath: string;
  private constructor() {
    // Environment variables or hardcoded defaults
    this.host = process.env.REDIS_HOST || "127.0.0.1"; // Default to localhost
    this.port = parseInt(process.env.REDIS_PORT || "6379", 10); // Default Redis port
    // this.password = process.env.REDIS_PASSWORD || ""; // Default empty string
    this.password = process.env.REDIS_PASSWORD || "Office@98351"; // Default empty string

    this.connectTimeout = parseInt(
      process.env.REDIS_CONNECT_TIMEOUT || "1000",
      10
    );
    this.maxRetriesPerRequest = parseInt(
      process.env.REDIS_MAX_RETRIES || "10",
      10
    );
    this.enableReadyCheck = process.env.REDIS_ENABLE_READY_CHECK === "true";
    this.lazyConnect = process.env.REDIS_LAZY_CONNECT === "true";
    this.basePath = "next";
    // Validation for required fields
    if (!this.host) {
      throw new Error("RedisConfig: Missing required 'host' configuration.");
    }

    if (!this.port) {
      throw new Error("RedisConfig: Missing or invalid 'port' configuration.");
    }

    if (!this.password) {
      throw new Error(
        "RedisConfig: Missing required 'password' configuration."
      );
    }

    // Additional validations
    if (this.port < 1 || this.port > 65535) {
      throw new Error("RedisConfig: Port number must be between 1 and 65535.");
    }

    if (this.connectTimeout < 0) {
      throw new Error("RedisConfig: Connect timeout cannot be negative.");
    }

    if (this.maxRetriesPerRequest < 0) {
      throw new Error("RedisConfig: Max retries cannot be negative.");
    }
  }

  // Singleton pattern
  public static getInstance(): RedisConfig {
    if (!RedisConfig.instance) {
      RedisConfig.instance = new RedisConfig();
    }
    return RedisConfig.instance;
  }
}

export default RedisConfig.getInstance();
