"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookFindManyResolver = exports.deleteImageResolver = exports.getImageResolver = exports.createBookResolver = void 0;
const s3_1 = require("./s3");
const resultHandling_1 = require("../utils/resultHandling");
const book_1 = require("../models/book");
const createBookResolver = async (req, res) => {
    const imagePath = [];
    for (let i = 0; i < req.files.length; i++) {
        const { response, error } = await (0, s3_1.awsResponse)((0, s3_1.uploadFile)(req.files[i]));
        if (error) {
            if (i === 0)
                res.send((0, resultHandling_1.result)(400, 'error upload image'));
            const { response } = await (0, s3_1.awsResponse)((0, s3_1.deleteFile)(imagePath[0].Key));
            if (response)
                res.send((0, resultHandling_1.result)(400, 'error upload image'));
        }
        imagePath.push(response.Key);
    }
    const data = await book_1.Book.create(Object.assign(Object.assign({}, req.body), { imagePath }));
    res.send((0, resultHandling_1.result)(200, data));
};
exports.createBookResolver = createBookResolver;
const getImageResolver = async (req, res) => {
    const key = req.params.key;
    const readStream = await (0, s3_1.awsImageResponse)((0, s3_1.downloadFile)(key));
    if (readStream.error)
        res.send((0, resultHandling_1.result)(400, 'error get image'));
    console.log('here readStream', readStream);
    console.log('sss', res);
    readStream.response.pipe(res);
};
exports.getImageResolver = getImageResolver;
const deleteImageResolver = async (req, res) => {
    const key = req.params.key;
    const { response, error } = await (0, s3_1.awsResponse)((0, s3_1.deleteFile)(key));
    console.log(response);
    if (error)
        res.send((0, resultHandling_1.result)(400, 'error delete image'));
    res.send((0, resultHandling_1.result)(200, 'image is already been delete'));
};
exports.deleteImageResolver = deleteImageResolver;
const bookFindManyResolver = async (req, res) => {
    const { text } = req.body;
    const projection = {
        bookTitle: 1,
        pax: 1,
        category: 1,
        imagePath: 1,
    };
    const data = await book_1.Book.find({ bookTitle: new RegExp(`${text}`, 'i') }, projection).populate({
        path: 'category',
        select: '_id nameCategory ',
    });
    console.log('dataa', data);
    if (!data)
        res.send((0, resultHandling_1.result)(404, 'book is not found'));
    res.send((0, resultHandling_1.result)(200, data));
};
exports.bookFindManyResolver = bookFindManyResolver;
//# sourceMappingURL=imageResolver.js.map