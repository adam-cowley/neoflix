"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDriver = exports.connect = void 0;
var neo4j_1 = require("./neo4j");
Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return neo4j_1.connect; } });
Object.defineProperty(exports, "getDriver", { enumerable: true, get: function () { return neo4j_1.getDriver; } });
