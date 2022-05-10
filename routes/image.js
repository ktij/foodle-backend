const {Router} = require('express');

const { extractName } = require('../controllers/extractName');
const { extractText } = require('../controllers/extractText');
const { extractIngredients } = require('../controllers/extractIngredients');

const imageRouter = Router();

// Routers
imageRouter.get('/extract-name/:bucketName/:fileName', extractName);
imageRouter.get('/extract-Text/:bucketName/:fileName', extractText);
imageRouter.get('/extract-Ingredients/:bucketName/:fileName', extractIngredients);


module.exports = imageRouter;