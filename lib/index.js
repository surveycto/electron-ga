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
exports.Analytics = void 0;
const helpers_1 = require("./helpers");
const side_effects_1 = require("./side-effects");
const consts_1 = require("./consts");
class Analytics {
    constructor(trackId, params = {}) {
        this.send = (hitType, additionalParams = {}) => __awaiter(this, void 0, void 0, function* () {
            const now = (0, side_effects_1.getNow)();
            const params = hitType ? this.getParams(hitType, additionalParams, now) : null;
            const cache = (0, side_effects_1.getCache)();
            const items = (0, helpers_1.prepareItems)([...cache, params].filter(_ => _), this.trackId, now);
            if (items.length === 0)
                return;
            const batches = (0, helpers_1.getBatches)(items, consts_1.BATCH_SIZE);
            const failedItems = yield (0, helpers_1.sendBatches)(batches);
            (0, side_effects_1.setCache)(failedItems);
        });
        this.trackId = trackId;
        const initParams = Object.assign(Object.assign({}, (0, helpers_1.getDefaultInitParams)()), params);
        Object.keys(initParams).forEach(key => (this[key] = initParams[key]));
        (0, side_effects_1.retry)(this.send, consts_1.RETRY);
    }
    getParams(hitType, additionalParams = {}, time) {
        return Object.assign({ __timestamp: time, t: hitType, v: (0, helpers_1.resolveParam)(this.protocolVersion), tid: (0, helpers_1.resolveParam)(this.trackId), cid: (0, helpers_1.resolveParam)(this.clientId), an: (0, helpers_1.resolveParam)(this.appName), av: (0, helpers_1.resolveParam)(this.appVersion), ul: (0, helpers_1.resolveParam)(this.language), ua: (0, helpers_1.resolveParam)(this.userAgent), vp: (0, helpers_1.resolveParam)(this.viewport), sr: (0, helpers_1.resolveParam)(this.screenResolution) }, additionalParams);
    }
}
exports.Analytics = Analytics;
exports.default = Analytics;
//# sourceMappingURL=index.js.map