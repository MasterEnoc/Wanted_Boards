const {readFile, readdir} = require('fs');
const {basename, join} = require('path');
const {homedir} = require('os');

let wantedTemplate = {
    title:'',
    username:'',
    boards:[]
};

function userPathHandler(req, res){

    const username = basename(basename(req.originalUrl));
    const boardDir = join(homedir(), 'wanted_boards', username, 'boards');

    readdir(boardDir, (err, files)=>{
        readFile(join(boardDir, files[0]), (err, data)=>{
            const wantedBoard = JSON.parse(data);

            wantedTemplate.title = Object.keys(wantedBoard);
            wantedTemplate.username = username;
            wantedTemplate.boards = wantedBoard[Object.keys(wantedBoard)];

            res.render('wanted', wantedTemplate, (err, html)=>{
                res.send(html);
            });
        });
    });
}

module.exports = {
    'userPathHandler':userPathHandler
};
