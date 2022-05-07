const {Router} = require('express');

const { extractText } = require('../controllers/extractText');

const imageRouter = Router();

// Routers
imageRouter.get('/extract-text/:bucketName/:fileName', extractText);

module.exports = imageRouter;