"use strict";
// src/util/route_util.js
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_native_1 = require("react-router-native");
// Passed in from parent component or from mapStateToProps
exports.Auth = function (_a) {
    var Component = _a.component, user = _a.user, loginUser = _a.loginUser, rest = __rest(_a, ["component", "user", "loginUser"]);
    var loggedIn = !!user;
    return (react_1.default.createElement(react_router_native_1.Route, __assign({}, rest, { render: function (props) { return (!loggedIn ? (react_1.default.createElement(Component, __assign({}, props, { loginUser: loginUser }))) : (
        // Redirect to the tweets page if the user is authenticated
        react_1.default.createElement(react_router_native_1.Redirect, { to: "/" }))); } })));
};
exports.Protected = function (_a) {
    var Component = _a.component, user = _a.user, _b = _a.loginUser, loginUser = _b === void 0 ? function () { } : _b, rest = __rest(_a, ["component", "user", "loginUser"]);
    var loggedIn = !!user;
    return (react_1.default.createElement(react_router_native_1.Route, __assign({}, rest, { render: function (props) {
            return loggedIn ? (react_1.default.createElement(Component, __assign({}, props, { user: user, loginUser: loginUser }))) : (
            // Redirect to the login page if the user is already authenticated
            react_1.default.createElement(react_router_native_1.Redirect, { to: "/login" }));
        } })));
};
// Use the isAuthenitcated slice of state to determine whether a user is logged in
// const mapStateToProps = state => (
//     { loggedIn: state.session.isAuthenticated }
// );
// export const AuthRoute = withRouter(Auth);
//
// export const ProtectedRoute = withRouter(Protected);
