"use strict";
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
var react_router_native_1 = require("react-router-native");
var RouteUtil_1 = require("../util/RouteUtil");
var react_native_1 = require("react-native");
var Login_1 = __importDefault(require("./Login"));
var Signup_1 = __importDefault(require("./Signup"));
var UserProfile_1 = __importDefault(require("./users/UserProfile"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var SessionApiUtil_1 = require("../util/SessionApiUtil");
var App = function (props) {
    var history = props.history;
    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];
    var loginUser = function (user) {
        setUser(user);
    };
    react_1.useEffect(function () {
        SessionApiUtil_1.getJwtToken().then(function (user) {
            if (user) {
                var decodedUser = jwt_decode_1.default(user);
                var currentTime = Date.now() / 1000;
                if (decodedUser.exp < currentTime) {
                    // Logout the user and redirect to the login page
                    console.log(history);
                    SessionApiUtil_1.logout().then(function () {
                        history.push("/login");
                    });
                }
                else {
                    setUser(decodedUser);
                }
            }
        });
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !user && react_1.default.createElement(react_router_native_1.Link, { to: "/login" },
            react_1.default.createElement(react_native_1.Text, null, "Log in")),
        !user && react_1.default.createElement(react_router_native_1.Link, { to: "/signup" },
            react_1.default.createElement(react_native_1.Text, null, "Sign up")),
        !!user && react_1.default.createElement(react_router_native_1.Link, { to: "/signout" },
            react_1.default.createElement(react_native_1.Text, null, "Sign out")),
        react_1.default.createElement(RouteUtil_1.Auth, { path: '/login', user: user, loginUser: loginUser, component: Login_1.default }),
        react_1.default.createElement(RouteUtil_1.Auth, { path: '/signup', user: user, loginUser: loginUser, component: Signup_1.default }),
        react_1.default.createElement(react_router_native_1.Switch, null,
            react_1.default.createElement(RouteUtil_1.Protected, { path: '/', user: user, component: UserProfile_1.default }),
            react_1.default.createElement(react_router_native_1.Route, { path: "/", component: Login_1.default }))));
};
exports.default = App;
