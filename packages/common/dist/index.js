"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_router_native_1 = require("react-router-native");
var App_1 = __importDefault(require("./components/App"));
exports.Root = function () {
    return (react_1.default.createElement(react_router_native_1.NativeRouter, null,
        react_1.default.createElement(react_native_1.SafeAreaView, null,
            react_1.default.createElement(react_router_native_1.Route, { path: "/", component: App_1.default }))));
};
