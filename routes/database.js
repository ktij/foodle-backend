const {Router} = require('express');

const { addItem } = require('../controllers/database');

const databaseRouter = Router();

// Routers
databaseRouter.get('/add-item', addItem);

module.exports = databaseRouter;