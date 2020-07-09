const userRouter = require('express').Router();
const userRouterBoard = require('express').Router();
const {userPathHandler, userPathBoardHandler} = require('./userPathHandler');
const {usersPath} = require('../userPath');

userRouter.get('/', (req, res)=>{
    userPathHandler(req, res);
});

userRouterBoard.get('/*', (req, res)=>{
    userPathBoardHandler(req, res);
});

module.exports = {
    'userRouter':userRouter,
    'userRouterBoard':userRouterBoard
};
