const {readdir, readFile} = require('fs');
const {homedir} = require('os');
const {join} = require('path');

function handleGetLogin(res){
    res.render('login',(err, html)=>{
        res.send(html);
    });
}

function handlePostLogin(req, res, next){
    readdir(homedir()+'/wanted_boards', (err, files)=>{
        if (err){
            // if wanted_boards directory does not exists the user will be redirected to the
            // error middleware which will show an error page
            next(err);
        } else {
            let fUser = files.some((file)=>file == req.body.username);

            readFile(join(homedir(), 'wanted_boards', req.body.username, req.body.username+'.json'),
            (err, data)=>{

                let password;

                try {
                    password = JSON.parse(data).password;
                } catch (err) {
                    next();
                }

                if (fUser && password===req.body.password ){
                    res.redirect('/'+req.body.username);
                } else {
                    next();
                }
            });
        }
    });
}

module.exports={
    'handleGetLogin':handleGetLogin,
    'handlePostLogin':handlePostLogin
};
