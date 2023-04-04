"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBatches = exports.getBatches = exports.prepareItems = exports.resolveParam = exports.getDefaultInitParams = exports.prepareUserAgent = void 0;
const qs_1 = require("qs");
const consts_1 = require("./consts");
const side_effects_1 = require("./side-effects");
const prepareUserAgent = (userAgent, appName) => userAgent.replace(new RegExp(`${appName}\\/\\d+\\.\\d+\\.\\d+ `), '').replace(/Electron\/\d+\.\d+\.\d+ /, '');
exports.prepareUserAgent = prepareUserAgent;
const getDefaultInitParams = () => {
    const appName = (0, side_effects_1.getAppName)();
    return {
        protocolVersion: '1',
        clientId: (0, side_effects_1.getClientId)(),
        appName,
        appVersion: (0, side_effects_1.getAppVersion)(),
        language: (0, side_effects_1.getLanguage)(),
        userAgent: (0, exports.prepareUserAgent)((0, side_effects_1.getUserAgent)(), appName),
        viewport: side_effects_1.getViewport,
        screenResolution: side_effects_1.getScreenResolution
    };
};
exports.getDefaultInitParams = getDefaultInitParams;
// @ts-ignore
const resolveParam = (value) => (typeof value === 'function' ? value() : value);
exports.resolveParam = resolveParam;
const prepareItems = (items, trackId, time) => items.map(item => (Object.assign(Object.assign({}, item), { tid: trackId, qt: time - item.__timestamp })));
exports.prepareItems = prepareItems;
const getBatches = (items, batchSize) => items.reduce((batches, item) => batches[batches.length - 1].length >= batchSize
    ? [...batches, [item]]
    : [...batches.slice(0, batches.length - 1), [...batches[batches.length - 1], item]], [[]]);
exports.getBatches = getBatches;
const sendBatches = ([batch, ...others], failedItems = []) => __awaiter(void 0, void 0, void 0, function* () {
    if (!batch || batch.length === 0)
        return failedItems;
    try {
        yield (0, side_effects_1.fetch)(consts_1.URL, { method: 'post', body: batch.map(item => (0, qs_1.stringify)(item)).join('\n') });
        return yield (0, exports.sendBatches)(others, failedItems);
    }
    catch (error) {
        return yield (0, exports.sendBatches)(others, [...failedItems, ...batch]);
    }
});
exports.sendBatches = sendBatches;
//# sourceMappingURL=helpers.js.map