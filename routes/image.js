import {Request, Response, Router} from 'express'
const {getBalance} =require('../controllers/points');

const imageRouter = Router();

//Points router
imageRouter.get('/balance/:userId',getBalance)
imageRouter.post('/balance/:userId',getBalance)

module.exports = imageRouter;