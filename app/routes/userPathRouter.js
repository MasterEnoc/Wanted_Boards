const userRouter = require('express').Router();
const userRouterBoard = require('express').Router();
const updateBoard = require('express').Router();
const deleteBoard = require('express').Router();
const {userPathHandler, userPathBoardHandler, updateHandler, deleteHandler} = require('./userPathHandler');

userRouter.get('/', (req, res, next)=>{
    userPathHandler(req, res, next);
});

userRouterBoard.get('/*', (req, res, next)=>{
    userPathBoardHandler(req, res, next);
});

updateBoard.post('/*/update', (req, res, next)=>{
    updateHandler(req, res, next);
});

deleteBoard.get('/*/delete', (req, res, next)=>{
    deleteHandler(req, res, next);
});

module.exports = {
    'userRouter':userRouter,
    'userRouterBoard':userRouterBoard,
    'updateBoard':updateBoard,
    'deleteBoard':deleteBoard
};
