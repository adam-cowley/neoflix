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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDriver = exports.connect = void 0;
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
let cachedDriver;
function connect(uri, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedDriver) {
            return Promise.resolve(cachedDriver);
        }
        // Create driver instance
        const driver = neo4j_driver_1.default.driver(uri, neo4j_driver_1.default.auth.basic(username, password));
        // Verify Connectivity
        yield driver.verifyConnectivity();
        return driver;
    });
}
exports.connect = connect;
function getDriver() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cachedDriver) {
            throw new Error('No cached driver instance, have you called `connect()` ?');
        }
        return cachedDriver;
    });
}
exports.getDriver = getDriver;
