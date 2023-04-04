import * as remote from '@electron/remote';
import { machineIdSync } from 'node-machine-id';
import { CACHE_KEY_NAME } from './consts';
import { Item } from './types';

export const getAppName = (): string => remote.app.getName();

export const getAppVersion = (): string => remote.app.getVersion();

export const getClientId = (): string => machineIdSync();

export const getLanguage = (): string => window.navigator.language;

export const getUserAgent = (): string => window.navigator.userAgent;

export const getViewport = (): string => `${window.innerWidth}x${window.innerHeight}`;

export const getScreenResolution = (): string => {
  const screen = remote.screen.getPrimaryDisplay();
  return `${screen.size.width}x${screen.size.height}`;
};

export const getNow = (): number => Date.now();

export const getCache = (): Item[] => {
  const cache = window.localStorage.getItem(CACHE_KEY_NAME);
  return cache ? JSON.parse(cache) : [];
};

export const setCache = (cache: object[]): void => {
  window.localStorage.setItem(CACHE_KEY_NAME, JSON.stringify(cache));
};

export const retry = (cb: Function, schedule: number) => setInterval(cb, schedule);

export const fetch = (url, options) => window.fetch(url, options);
