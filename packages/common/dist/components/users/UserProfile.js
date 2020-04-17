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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var UserApiUtil_1 = require("../../util/UserApiUtil");
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var endpoint = "http://192.168.86.161:5000/";
var socket = socket_io_client_1.default(endpoint);
var UserProfile = function (props) {
    // const [endpoint, setEndpoint] = useState("http://192.168.86.161:5000/");
    var _a = react_1.useState(Array()), bottles = _a[0], setBottles = _a[1];
    // const [socket, setSocket] = useState(socketIOClient(endpoint));
    var _b = react_1.useState(false), adding = _b[0], setAdding = _b[1];
    var _c = react_1.useState(false), confirmBottle = _c[0], setConfirmBottle = _c[1];
    var _d = react_1.useState(false), confirmFill = _d[0], setConfirmFill = _d[1];
    var _e = react_1.useState({}), fills = _e[0], setFills = _e[1];
    var _f = react_1.useState(undefined), bottle = _f[0], setBottle = _f[1];
    var user = props.user;
    var fetchFills = function () {
        UserApiUtil_1.fetchUserFills().then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
            var jsonRes, bottleFills_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!res) return [3 /*break*/, 2];
                        return [4 /*yield*/, res.json()];
                    case 1:
                        jsonRes = _a.sent();
                        bottleFills_1 = {};
                        jsonRes.fills.forEach(function (fill) { return !!bottleFills_1[fill.bottle] ? bottleFills_1[fill.bottle].push(fill) : bottleFills_1[fill.bottle] = [fill]; });
                        setFills(bottleFills_1);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    var startAdding = function () {
        setAdding(true);
        setTimeout(function () {
            setAdding(false);
            setConfirmBottle(false);
        }, 10000);
    };
    react_1.useEffect(function () {
        socket.open();
        socket.on("askForBottleConfirmation", function (data) {
            setBottle(data);
        });
        socket.on("addedBottle", function (data) {
            setAdding(false);
            setBottles(__spreadArrays(bottles, [data._doc]));
        });
        socket.on("addingFailed", function (res) {
            setAdding(false);
        });
        socket.on('pullBottles', function (newBottles) {
            setBottles(newBottles);
        });
        socket.emit('startPullingBottles', user._id);
        fetchFills();
        var findFills = setInterval(fetchFills, 10000);
        return function () {
            clearInterval(findFills);
            socket.close();
        };
    }, []);
    react_1.useEffect(function () {
        if (bottle) {
            setConfirmBottle(true);
        }
        else {
            setConfirmBottle(false);
        }
    }, [bottle]);
    react_1.useEffect(function () {
        console.log(fills);
    }, [fills]);
    return (!adding ? (react_1.default.createElement(react_native_1.View, null,
        react_1.default.createElement(react_native_1.Text, null, "Your Bottles:"),
        bottles.map(function (b) {
            return (react_1.default.createElement(react_native_1.View, { key: b._id },
                react_1.default.createElement(react_native_1.Text, null, b.uuid),
                react_1.default.createElement(react_native_1.Text, null, b.dateAdded),
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(react_native_1.Text, null, "Fills:"),
                    !!fills[b._id] && fills[b._id].map(function (f) {
                        return (react_1.default.createElement(react_native_1.View, { key: f._id },
                            react_1.default.createElement(react_native_1.Text, null, f.fillingStarted),
                            react_1.default.createElement(react_native_1.Text, null, f.fillTime)));
                    }))));
        }),
        react_1.default.createElement(react_native_1.Button, { title: "Add Bottle", onPress: function () {
                socket.emit("addBottle", user._id);
                startAdding();
            } }))) : (confirmBottle && !!bottle) ? (react_1.default.createElement(react_native_1.View, null,
        react_1.default.createElement(react_native_1.Text, null, "Is this your bottle?"),
        react_1.default.createElement(react_native_1.Text, null, bottle.uuid),
        react_1.default.createElement(react_native_1.Button, { title: "confirmBottle", onPress: function () { return socket.emit("confirmAddBottle"); } }))) : (react_1.default.createElement(react_native_1.View, null,
        react_1.default.createElement(react_native_1.Text, null, "Searching for smart bottle"),
        react_1.default.createElement(react_native_1.ActivityIndicator, { size: "large", color: "blue" }))));
};
exports.default = UserProfile;
