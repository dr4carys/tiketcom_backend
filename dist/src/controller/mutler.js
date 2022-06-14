"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploads3 = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3 = new aws_sdk_1.default.S3({
    region: 'ap-southeast-1',
    accessKeyId: 'AKIAWZYISU5UAMKFHION',
    secretAccessKey: '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',
});
const dir = './public';
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir, { recursive: true });
}
const fileStorageEngine = multer_1.default.diskStorage({
    filename: (req, file, cb) => {
        console.log(file);
        cb(undefined, Date.now() + '-' + file.originalname);
    },
});
const fileStorageEngineS3 = (0, multer_s3_1.default)({
    s3: s3,
    bucket: 'projectbram',
    metadata: (req, file, cb) => {
        cb(undefined, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(undefined, Date.now().toString());
    },
});
exports.upload = (0, multer_1.default)({ storage: fileStorageEngine });
exports.uploads3 = (0, multer_1.default)({ storage: fileStorageEngineS3 });
//# sourceMappingURL=mutler.js.map