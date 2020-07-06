const {readFile, readdir} = require('fs');
const {basename, join} = require('path');
const {homedir} = require('os');

function userPathHandler(req, res){

    const username = basename(basename(req.originalUrl));
    const boardDir = join(homedir(), 'wanted_boards', username, 'boards');

    readdir(boardDir, (err, files)=>{
        readFile(join(boardDir, files[0]), (err, data)=>{
            const title = JSON.parse(data);

            res.render('wanted',{title:Object.keys(title), username:username}, (err, html)=>{
                res.send(html);
            });
        });
    });
}

module.exports = {
    'userPathHandler':userPathHandler
};
