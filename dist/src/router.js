"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const hotel_1 = require("./controller/hotel");
const paging_1 = require("./middleware/paging");
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
router.get('/hotel', paging_1.Paging, hotel_1.hotelConnections);
router.get('/hotelwithoutDB', paging_1.Paging, hotel_1.hotelWithOutDB);
module.exports = router;
//# sourceMappingURL=router.js.map