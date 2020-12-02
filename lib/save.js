"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRoutesFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const prettier = __importStar(require("prettier"));
const path_1 = __importDefault(require("path"));
const log_symbols_1 = __importDefault(require("log-symbols"));
const chalk_1 = __importDefault(require("chalk"));
async function saveRoutesFiles(filePath, templateRoutes) {
    try {
        let prettierFoundOptions = await prettier.resolveConfig(process.cwd());
        if (!prettierFoundOptions) {
            prettierFoundOptions = require('../.prettierrc');
        }
        const formatedModelsFile = prettier.format(templateRoutes, {
            ...prettierFoundOptions,
            parser: 'typescript',
        });
        const savePath = path_1.default.resolve(process.cwd(), filePath);
        fs_1.default.writeFileSync(savePath, formatedModelsFile);
        console.log(log_symbols_1.default.success, `Route definition file generated at ${chalk_1.default.blue(savePath)}`);
    }
    catch (e) {
        console.error(chalk_1.default.red('Error while saving route definitions file'), '\n' + e);
        return Promise.reject(e);
    }
}
exports.saveRoutesFiles = saveRoutesFiles;
