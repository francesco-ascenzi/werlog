"use strict";
/// <reference path="./types/index.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// Remove circular references to prevent infinite loops
function removeCircular(obj) {
    var seen = new Map();
    var recurse = function (passedObj) {
        seen.set(passedObj, true);
        for (var _i = 0, _a = Object.entries(passedObj); _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v = _b[1];
            if (typeof v !== "object")
                continue;
            if (seen.has(v))
                delete passedObj[k];
            else
                recurse(v);
        }
    };
    recurse(obj);
}
/** WERLOG
 *
 * Lightweigth async utility that prints or writes logs to the console or to a file
 *
 * @param {any} data Any input data
 * @param {string} options.filePath Output file path (default = './werlog.txt')
 * @param {boolean} options.print Also print string to the console (default = false)
 * @param {string} options.printType Type of console message ( 'f' = fatal || 'w' = warning/error || 'd' = debug || undefined|null|empty|default = info )
 * @param {number} options.maxFileChars Max string length in file (default = 3600 characters)
 * @param {number} options.maxPrintChars Max string length on console (default = 1000000 characters)
 *
 * @return {Promise<boolean>} Boolean return and console.error message if there was something went wrong
 */
function werlog(data_1) {
    return __awaiter(this, arguments, void 0, function (data, options) {
        var currDate, consoleErrorText, fileErrorText, consoleError, printFormat, defMaxPrintChars, defMaxFileChars, outputFilePath, err_1;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // DATA CONVERT | Converts all data types to string
                    if (typeof data == 'object') {
                        try {
                            // Handle circular reference error
                            removeCircular(data);
                            data = JSON.stringify(data);
                        }
                        catch (err) {
                            data = err;
                        }
                    }
                    else if (data && data.stack) {
                        data = "Stack trace error: ".concat(data.stack);
                    }
                    else if (data === undefined) {
                        data = 'undefined';
                    }
                    else if (data === null) {
                        data = 'null';
                    }
                    else {
                        data = data.toString();
                    }
                    currDate = new Date().toLocaleString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                    // Add milliseconds
                    currDate = "".concat(currDate, ".").concat(new Date().getMilliseconds().toFixed(4));
                    consoleErrorText = '';
                    fileErrorText = '';
                    consoleError = true;
                    printFormat = "[".concat(currDate, "]");
                    defMaxPrintChars = Number.MAX_SAFE_INTEGER;
                    defMaxFileChars = 3600;
                    outputFilePath = path_1.default.join('./werlog.txt');
                    if (typeof options['filePath'] == 'string') {
                        try {
                            outputFilePath = path_1.default.join(options.filePath);
                        }
                        catch (err) {
                            console.error(printFormat, "Path value error:", err);
                            return [2 /*return*/, false];
                        }
                    }
                    // Prints it on console?
                    if (typeof options['print'] == 'boolean' && options.print == true) {
                        // Print with different colors: f = fatal | w = warning/error | d = debug (default: info)
                        if (typeof options['printType'] == 'string') {
                            if (options.printType == 'f') {
                                printFormat = "\u001B[31m[".concat(currDate, "]\u001B[0m");
                            }
                            else if (options.printType == 'w') {
                                printFormat = "\u001B[33m[".concat(currDate, "]\u001B[0m");
                            }
                            else if (options.printType == 'd') {
                                consoleError = false;
                                printFormat = "\u001B[90m[".concat(currDate, "]\u001B[0m");
                            }
                            else {
                                consoleError = false;
                            }
                        }
                        // Max print length
                        if (typeof options['maxPrintChars'] == 'number' && options.maxPrintChars > 0) {
                            consoleErrorText = data.substring(0, options.maxPrintChars);
                        }
                        else {
                            consoleErrorText = data.substring(0, defMaxPrintChars);
                        }
                        // Prints it
                        if (consoleError) {
                            console.error(printFormat, consoleErrorText);
                        }
                        else {
                            console.log(printFormat, consoleErrorText);
                        }
                    }
                    // Substring file error text
                    if (typeof options['maxFileChars'] == 'number' && options.maxFileChars > 0) {
                        fileErrorText = data.substring(0, options.maxFileChars);
                    }
                    else {
                        fileErrorText = data.substring(0, defMaxFileChars);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_1.default.promises.appendFile(outputFilePath, "[".concat(currDate, "] ").concat(fileErrorText, "\r\n"), 'utf8')];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(printFormat, err_1);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/, true];
            }
        });
    });
}
module.exports = werlog;
