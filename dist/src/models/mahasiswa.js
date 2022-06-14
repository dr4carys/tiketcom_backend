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
exports.MahasiswaTC = exports.Mahasiswa = exports.mahasiswaSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.mahasiswaSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    imageKey: { type: String },
}, {
    timestamps: true,
});
exports.mahasiswaSchema.index({ createdAt: 1, updatedAt: 1 });
exports.Mahasiswa = mongoose_1.default.model('Mahasiswa', exports.mahasiswaSchema, 'mahasiswa', true);
exports.MahasiswaTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Mahasiswa, {
    onlyFields: ['name', '_id'],
});
//# sourceMappingURL=mahasiswa.js.map