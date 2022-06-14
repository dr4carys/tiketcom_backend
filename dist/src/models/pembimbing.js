"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PembimbingTC = exports.Pembimbing = exports.pembimbingSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.pembimbingSchema = new mongoose_1.Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.pembimbingSchema.index({ createdAt: 1, updatedAt: 1 });
exports.Pembimbing = mongoose_1.default.model('Pembimbing', exports.pembimbingSchema, 'pembimbing', true);
exports.PembimbingTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Pembimbing, {
    onlyFields: ['name', '_id'],
});
//# sourceMappingURL=pembimbing.js.map