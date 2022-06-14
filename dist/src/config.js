"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_DEBUG = exports.MONGODB_URL = exports.AWS_ARN = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_BUCKET_REGION = exports.AWS_ACCESS_KEY = exports.AWS_BUCKET_NAME = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
exports.AWS_ACCESS_KEY = 'AKIAWZYISU5UAMKFHION';
exports.AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
exports.AWS_SECRET_ACCESS_KEY = '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';
exports.AWS_ARN = process.env.AWS_ARN;
exports.MONGODB_URL = process.env.MONGODB_URI;
exports.MONGO_DEBUG = true;
//# sourceMappingURL=config.js.map