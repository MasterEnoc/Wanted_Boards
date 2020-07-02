const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('login',(err, html)=>{
        res.send(html);
    });
});

module.exports = {
    'router':router
};
