const {Router} = require('express');

const { addItem } = require('../controllers/addItem');
const { getItem } = require('../controllers/getItem');

const databaseRouter = Router();

var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// Routers
databaseRouter.post('/add-item/:docID', jsonParser, addItem);
databaseRouter.get('/get-item/:docID', jsonParser, getItem);

module.exports = databaseRouter;