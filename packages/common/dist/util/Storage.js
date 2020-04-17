"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var async_storage_backend_legacy_1 = __importDefault(require("@react-native-community/async-storage-backend-legacy"));
var async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
var legacy = new async_storage_backend_legacy_1.default();
var storage = async_storage_1.default.create(legacy);
exports.default = storage;
