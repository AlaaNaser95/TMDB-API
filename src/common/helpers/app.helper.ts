import { Cache } from 'cache-manager';

export class AppHelper {
  public static async getOrSetCache<T>(
    cacheManager: Cache,
    key: string,
    fetchFunction: () => any,
  ) {
    const cached = await cacheManager.get<T>(key);
    if (cached) {
      return cached;
    }
    const result = await fetchFunction();
    await cacheManager.set(key, result);
    return result;
  }
}
