"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generated_js_1 = __importDefault(require("../generated.js"));
exports.default = (ctx, inject) => {
    inject('$routeNames', generated_js_1.default);
};
