const userRouter = require('express').Router();
const userRouterBoard = require('express').Router();
const updateBoard = require('express').Router();
const {userPathHandler, userPathBoardHandler, updateHandler} = require('./userPathHandler');

userRouter.get('/', (req, res, next)=>{
    userPathHandler(req, res);
});

userRouterBoard.get('/*', (req, res, next)=>{
    userPathBoardHandler(req, res);
});

updateBoard.post('/*/update', (req, res)=>{
    updateHandler(req, res);
});

module.exports = {
    'userRouter':userRouter,
    'userRouterBoard':userRouterBoard,
    'updateBoard':updateBoard
};
