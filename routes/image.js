const {Router} = require('express');

const { extractText } = require('../controllers/extractText');
const { extractName } = require('../controllers/extractName');
const { extractIngredients } = require('../controllers/extractIngredients');
const { extractNutrition } = require('../controllers/extractNutrition');

const imageRouter = Router();

// Routers
imageRouter.get('/extract-Text/:bucketName/:fileName', extractText);
imageRouter.get('/extract-name/:bucketName/:fileName', extractName);
imageRouter.get('/extract-ingredients/:bucketName/:fileName', extractIngredients);
imageRouter.get('/extract-nutrition/:bucketName/:fileName', extractNutrition);

module.exports = imageRouter;