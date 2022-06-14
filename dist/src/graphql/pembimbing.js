"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buatPembimbing = void 0;
const pembimbing_1 = require("../models/pembimbing");
exports.buatPembimbing = pembimbing_1.PembimbingTC.mongooseResolvers
    .createOne()
    .removeArg('record')
    .wrapResolve((next) => async (rp) => {
    const payload = rp.args;
    rp.args.record = payload;
    return next(rp);
})
    .addArgs({ _id: 'String!', name: 'String' });
//# sourceMappingURL=pembimbing.js.map