const loginRouter = require('express').Router();
const {handleGetLogin, handlePostLogin} = require('./loginHandler');


loginRouter.all('/login', (req, res)=>{
    if(req.method == 'GET'){
        handleGetLogin(res);
    }

    if(req.method == "POST"){
        handlePostLogin(req, res);
    }
});

module.exports = {
    'loginRouter':loginRouter
};
