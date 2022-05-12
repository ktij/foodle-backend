const {Router} = require('express');

const { addItem } = require('../controllers/addItem');
const { getItem } = require('../controllers/getItem');
const { addNewItem } = require('../controllers/addNewItem');
const { getItemByName } = require('../controllers/getItemByName');


const databaseRouter = Router();

var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// Routers
databaseRouter.post('/add-item/:docID', jsonParser, addItem);
databaseRouter.get('/get-item/:docID', jsonParser, getItem);
databaseRouter.post('/add-new-item/:docID/:frontImage/:ingredientsImage', addNewItem);
databaseRouter.get('/get-item-by-name/:name', jsonParser, getItemByName);

module.exports = databaseRouter;