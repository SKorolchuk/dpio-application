import { Injectable } from '@angular/core';
import { ResponseOptions } from '@angular/http';
import { each } from 'lodash';

import { Logger } from '../logger.service';

const log = new Logger('HttpCacheService');
const cachePersistenceKey = 'httpCache';

export interface HttpCacheEntry {
  lastUpdated: Date;
  data: ResponseOptions;
}

/**
 * Provides a cache facility for HTTP requests with configurable persistence policy.
 */
@Injectable()
export class HttpCacheService {
  private cachedData: { [key: string]: HttpCacheEntry } = {};
  private storage: Storage = null;

  constructor() {
    this.loadCacheData();
  }

  /**
   * Sets the cache data for the specified request.
   */
  setCacheData(url: string, params: any, data: ResponseOptions, lastUpdated?: Date) {
    const cacheKey = this.getCacheKey(url, params);
    this.cachedData[cacheKey] = {
      lastUpdated: lastUpdated || new Date(),
      data: data
    };
    log.debug('Cache set for key: "' + cacheKey + '"');
    this.saveCacheData();
  }

  /**
   * Gets the cached data for the specified request.
   */
  getCacheData(url: string, params?: any): ResponseOptions {
    const cacheKey = this.getCacheKey(url, params);
    const cacheEntry = this.cachedData[cacheKey];

    if (cacheEntry) {
      log.debug('Cache hit for key: "' + cacheKey + '"');
      return cacheEntry.data;
    }

    return null;
  }

  /**
   * Gets the cached entry for the specified request.
   */
  getHttpCacheEntry(url: string, params?: any): HttpCacheEntry {
    return this.cachedData[this.getCacheKey(url, params)] || null;
  }

  /**
   * Clears the cached entry (if exists) for the specified request.
   */
  clearCache(url: string, params?: any): void {
    const cacheKey = this.getCacheKey(url, params);
    this.cachedData[cacheKey] = undefined;
    log.debug('Cache cleared for key: "' + cacheKey + '"');
    this.saveCacheData();
  }

  /**
   * Cleans cache entries older than the specified date.
   */
  cleanCache(expirationDate?: Date) {
    if (expirationDate) {
      each(this.cachedData, (value: HttpCacheEntry, key: string) => {
        if (expirationDate >= value.lastUpdated) {
          delete this.cachedData[key];
        }
      });
    } else {
      this.cachedData = {};
    }
    this.saveCacheData();
  }

  /**
   * Sets the cache persistence policy.
   * Note that changing the cache persistence will also clear the cache from its previous storage.
   *   storage, or if no value is provided it will be only in-memory (default).
   */
  setPersistence(persistence?: 'local' | 'session') {
    const _window: any = window;

    this.cleanCache();
    this.storage = persistence === 'local' || persistence === 'session' ? _window[persistence + 'Storage'] : null;
    this.loadCacheData();
  }

  private getCacheKey(url: string, params?: any): string {
    return url + (params ? JSON.stringify(params) : '');
  }

  private saveCacheData() {
    if (this.storage) {
      this.storage[cachePersistenceKey] = JSON.stringify(this.cachedData);
    }
  }

  private loadCacheData() {
    const data = this.storage ? this.storage[cachePersistenceKey] : null;
    this.cachedData = data ? (JSON.stringify(data) as any) : {};
  }
}
