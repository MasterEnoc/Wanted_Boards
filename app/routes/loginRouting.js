const loginRouter = require('express').Router();
const {handleGetLogin, handlePostLogin} = require('./loginHandler');


loginRouter.all('/login', [
    (req, res, next)=>{
        if(req.method == 'GET'){
            handleGetLogin(res);
        } else {
            next();
        }
    },

    (req, res, next)=>{
        // on any invalid user or password the next handler is used
        handlePostLogin(req, res, next);
    },

    (req, res)=>{
        // render login view with an error message
        res.render('login',{error:true},(err, html)=>{
            res.send(html);
        });
    }
]);

module.exports = {
    'loginRouter':loginRouter
};
