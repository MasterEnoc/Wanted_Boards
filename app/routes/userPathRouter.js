const userRouter = require('express').Router();
const userRouterBoard = require('express').Router();
const {userPathHandler} = require('./userPathHandler');
const {usersPath} = require('../userPath');

userRouter.get('/', (req, res)=>{
    userPathHandler(req, res);
});

userRouterBoard.get('/*', (req, res)=>{
    res.send('lmao');
});

module.exports = {
    'userRouter':userRouter,
    'userRouterBoard':userRouterBoard
};
