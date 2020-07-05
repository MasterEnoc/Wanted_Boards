const {readdir, readFile} = require('fs');
const {homedir} = require('os');
const {join} = require('path');

function handleGetLogin(res){
    res.render('login',(err, html)=>{
        res.send(html);
    });
}

function handlePostLogin(req, res){
    readdir(homedir()+'/wanted_boards', (err, files)=>{
        let fUser = files.some((file)=>file == req.body.username);

        readFile(join(homedir(), 'wanted_boards', req.body.username, req.body.username+'.json'), (err, data)=>{

            let password;

            try {
                password = JSON.parse(data).password;
            } catch (err) {
                password = undefined;
            }

            if (fUser && password==req.body.password ){
                res.render('wanted', (err, html)=>{
                    res.send(html);
                });
            } else {
                res.render('login',{error:true},(err, html)=>{
                    res.send(html);
                });
            }
        });
    });
}

module.exports={
    'handleGetLogin':handleGetLogin,
    'handlePostLogin':handlePostLogin
};
