const {Router} = require('express');
const { downloadItem } = require('../controllers/downloadItem');

const {getItems} = require('../controllers/getItems');

const storageRouter = Router();

// Routers
storageRouter.get('/get-items/:bucketName', getItems);
storageRouter.get('/download-item/:bucketName/:fileName', downloadItem);

module.exports = storageRouter;