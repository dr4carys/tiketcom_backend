"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.downloadFile = exports.uploadFile = exports.awsImageResponse = exports.awsResponse = void 0;
const config_1 = require("../config");
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3Instance = new aws_sdk_1.default.S3({
    region: config_1.AWS_BUCKET_REGION,
    accessKeyId: config_1.AWS_ACCESS_KEY,
    secretAccessKey: config_1.AWS_SECRET_ACCESS_KEY,
});
async function awsResponse(arg) {
    try {
        return { response: await arg.promise() };
    }
    catch (e) {
        return { error: e };
    }
}
exports.awsResponse = awsResponse;
const awsImageResponse = async (arg) => {
    try {
        return { response: await arg };
    }
    catch (e) {
        return { error: e };
    }
};
exports.awsImageResponse = awsImageResponse;
const uploadFile = (file) => {
    const fileStream = fs_1.default.createReadStream(file.path);
    const uploadParams = {
        Bucket: config_1.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename,
    };
    return s3Instance.upload(uploadParams);
};
exports.uploadFile = uploadFile;
const downloadFile = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: config_1.AWS_BUCKET_NAME,
    };
    return s3Instance.getObject(downloadParams).createReadStream();
};
exports.downloadFile = downloadFile;
const deleteFile = (fileKey) => {
    const deleteParams = {
        Key: fileKey,
        Bucket: config_1.AWS_BUCKET_NAME,
    };
    return s3Instance.deleteObject(deleteParams);
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=s3.js.map