"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var rootReducer = redux_1.combineReducers({});
exports.default = rootReducer;
// export default (prevState = {}, action: {payload: object, type: string}) => {
//     Object.freeze(prevState);
//     switch (action.type) {
//         default:
//             return prevState;
//     }
// }
