"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var redux_logger_1 = __importDefault(require("redux-logger"));
var RootReducer_1 = __importDefault(require("./reducers/RootReducer"));
var middleware = [redux_thunk_1.default];
if (process.env.NODE_ENV === "development")
    middleware.push(redux_logger_1.default);
var configureStore = function (preloadedState) {
    if (preloadedState === void 0) { preloadedState = {}; }
    return redux_1.createStore(RootReducer_1.default, preloadedState, redux_1.applyMiddleware.apply(void 0, middleware));
};
exports.default = configureStore;
