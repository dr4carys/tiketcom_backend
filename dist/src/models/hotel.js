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
exports.Hotel = exports.hotelSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.hotelSchema = new mongoose_1.Schema({
    Name: {
        type: String,
        required: true,
    },
    AvailableRoom: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.hotelSchema.index({ createdAt: 1, updatedAt: 1 });
exports.Hotel = mongoose_1.default.model('Hotel', exports.hotelSchema, 'Hotel', true);
// export const HotelTC = composeMongoose(Hotel);
//# sourceMappingURL=hotel.js.map