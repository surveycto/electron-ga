"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = exports.retry = exports.setCache = exports.getCache = exports.getNow = exports.getScreenResolution = exports.getViewport = exports.getUserAgent = exports.getLanguage = exports.getClientId = exports.getAppVersion = exports.getAppName = void 0;
const remote = require("@electron/remote");
const node_machine_id_1 = require("node-machine-id");
const consts_1 = require("./consts");
const getAppName = () => remote.app.getName();
exports.getAppName = getAppName;
const getAppVersion = () => remote.app.getVersion();
exports.getAppVersion = getAppVersion;
const getClientId = () => (0, node_machine_id_1.machineIdSync)();
exports.getClientId = getClientId;
const getLanguage = () => window.navigator.language;
exports.getLanguage = getLanguage;
const getUserAgent = () => window.navigator.userAgent;
exports.getUserAgent = getUserAgent;
const getViewport = () => `${window.innerWidth}x${window.innerHeight}`;
exports.getViewport = getViewport;
const getScreenResolution = () => {
    const screen = remote.screen.getPrimaryDisplay();
    return `${screen.size.width}x${screen.size.height}`;
};
exports.getScreenResolution = getScreenResolution;
const getNow = () => Date.now();
exports.getNow = getNow;
const getCache = () => {
    const cache = window.localStorage.getItem(consts_1.CACHE_KEY_NAME);
    return cache ? JSON.parse(cache) : [];
};
exports.getCache = getCache;
const setCache = (cache) => {
    window.localStorage.setItem(consts_1.CACHE_KEY_NAME, JSON.stringify(cache));
};
exports.setCache = setCache;
const retry = (cb, schedule) => setInterval(cb, schedule);
exports.retry = retry;
const fetch = (url, options) => window.fetch(url, options);
exports.fetch = fetch;
//# sourceMappingURL=side-effects.js.map