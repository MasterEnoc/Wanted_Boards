const {readdir, readFile} = require('fs');
const {homedir} = require('os');
const {join} = require('path');
const verifyLogin = require('express').Router();


// function verifyLogin(callback){
//     readdir(join(homedir(), '/wanted_boards'), (err, files)=>{
//         callback(files);
//     });
// }

verifyLogin.post('/login', (req, res)=>{
    readdir(homedir()+'/wanted_boards', (err, files)=>{
        let fUser = files.some((file)=>file == req.body.username);

        res.render('login',{error:!fUser},(err, html)=>{
            res.send(html);
        });

    });
});

module.exports = {
    'verifyLogin':verifyLogin
};
