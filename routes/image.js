const {Router} = require('express');

const { extractName } = require('../controllers/extractName');
const { extractText } = require('../controllers/extractText');

const imageRouter = Router();

// Routers
imageRouter.get('/extract-name/:bucketName/:fileName', extractName);
imageRouter.get('/extract-Text/:bucketName/:fileName', extractText);

module.exports = imageRouter;