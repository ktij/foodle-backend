const {Router} = require('express');

const {getItems} = require('../controllers/getItems');
const { downloadItem } = require('../controllers/downloadItem');

const storageRouter = Router();

// Routers
storageRouter.get('/get-items/:bucketName', getItems);
storageRouter.get('/download-item/:bucketName/:fileName', downloadItem);

module.exports = storageRouter;