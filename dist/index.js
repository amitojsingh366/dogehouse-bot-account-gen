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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var kebab_1 = require("@dogehouse/kebab");
var wrapper;
var axios_1 = __importDefault(require("axios"));
var fs_1 = __importDefault(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
var readline_1 = __importDefault(require("readline"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
try {
    kebab_1.raw.connect(process.env.TOKEN, process.env.REFRESH_TOKEN, {
        onConnectionTaken: function () {
            console.error("\nAnother client has taken the connection");
            process.exit();
        }
    }).then(function (c) {
        wrapper = kebab_1.wrap(c);
        start();
    });
}
catch (error) {
    if (error.code === 4001)
        console.error("invalid token!");
    console.error(error);
}
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            rl.question("Enter a username to register: ", function (ans) { return __awaiter(_this, void 0, void 0, function () {
                var data_1, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, wrapper.mutation.userCreateBot(ans)];
                        case 1:
                            data_1 = _a.sent();
                            if (data_1.apiKey) {
                                console.log(data_1);
                                axios_1.default.post("https://api.dogehouse.tv/bot/auth", { apiKey: data_1.apiKey }).then(function (resp) {
                                    if (resp.data) {
                                        resp.data.apiKey = data_1.apiKey;
                                        fs_1.default.writeFileSync(path_1.default.join(__dirname, "../tokens.json"), JSON.stringify(resp.data));
                                        console.log("Your token refresh token and apiKey are stored in " + path_1.default.join(__dirname, "../tokens.json"));
                                    }
                                    else {
                                        console.log('Encountered an error, please try again later, 1');
                                        process.exit();
                                    }
                                }).catch(function (e) {
                                    console.log(e);
                                    console.log('Encountered an error, please try again later, 2');
                                    process.exit();
                                });
                            }
                            if (data_1.isUsernameTaken) {
                                console.log("The username \"" + ans + "\" is already taken");
                                process.exit();
                            }
                            if (data_1.error) {
                                console.error(data_1.error);
                                process.exit();
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.log('Encountered an error, please try again later, 3');
                            process.exit();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
