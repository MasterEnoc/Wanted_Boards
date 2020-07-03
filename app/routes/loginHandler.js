const {readdir, readFile} = require('fs');
const {homedir} = require('os');

function handleGetLogin(res){
    res.render('login',(err, html)=>{
        res.send(html);
    });
}

function handlePostLogin(req, res){
    readdir(homedir()+'/wanted_boards', (err, files)=>{
        let fUser = files.some((file)=>file == req.body.username);
        if(!fUser){
            res.render('login',{error:!fUser},(err, html)=>{
                res.send(html);
            });
        } else {
            res.render('wanted', (err, html)=>{
                res.send(html);
            });
        }
    });
}

module.exports={
    'handleGetLogin':handleGetLogin,
    'handlePostLogin':handlePostLogin
};
