const {readFile, readdir, writeFile} = require('fs');
const {basename, join, parse} = require('path');
const {homedir} = require('os');

function userPathHandler(req, res, next){

    let homeTemplate = {
        username:basename(req.originalUrl),
        boards:[],
    };

    const boardDir = join(homedir(), 'wanted_boards', homeTemplate.username, 'boards');

    readdir(boardDir, (err, files)=>{
        if (err){
            next(err);
        } else {
            homeTemplate.boards = files.map(file => parse(file).name);
            res.render('home', homeTemplate, (err, html)=>{
                res.send(html);
            });
        }
    });
}

function userPathBoardHandler(req, res, next){
    let boardData = {
        title: basename(req.path),
        username: basename(req.baseUrl),
        boards:[],
        tables:[]
    };

    const boardDir = join(homedir(), 'wanted_boards', boardData.username, 'boards');

    readdir(boardDir, (err, files)=>{
        if (err) {
            next(err);
        } else {
            readFile(join(boardDir, boardData.title+'.json'), (err, data)=>{
                if (err) {
                    next(err);
                } else {

                    const wantedBoard = JSON.parse(data);

                    boardData.boards = files.map(file => parse(file).name);
                    boardData.tables = wantedBoard[Object.keys(wantedBoard)];

                    res.render('wanted', boardData, (err, html)=>{
                        res.send(html);
                    });
                }
            });
        }
    });
}

function updateHandler(req, res, next){
    const pathElements = req.originalUrl.split('/');
    const user = pathElements[1];
    const board = pathElements[2];
    const table = req.body.table;
    const fileUrl = join(homedir(), 'wanted_boards', user, 'boards', board+'.json');

    // if the user tries to add an empty task this middleware will not add any text
    if (req.body.text) {
        readFile(fileUrl, (err, data)=>{
            if (err) {
                next('err');
            } else {
                let file = JSON.parse(data);
                file[board][table].push(req.body.text);
                writeFile(fileUrl, JSON.stringify(file), (err)=>{
                    res.redirect('back');
                });
            }
        });
    } else {
        res.redirect('back');
    }
};

function deleteHandler(req, res, next){
    const pathElements = req.originalUrl.split('/');
    const user = pathElements[1];
    const board = pathElements[2];
    const table = req.query.table;
    const elementNo = req.query.elementNo;
    const fileUrl = join(homedir(), 'wanted_boards', user, 'boards', board+'.json');

    readFile(fileUrl, (err, data)=>{
        if (err){
            next(err);
        } else {
            let file = JSON.parse(data);
            file[board][table].splice(elementNo, 1);

            writeFile(fileUrl, JSON.stringify(file), (err)=>{
                res.redirect('back');
            });
        }
    });
};

module.exports = {
    'userPathHandler':userPathHandler,
    'userPathBoardHandler':userPathBoardHandler,
    'updateHandler':updateHandler,
    'deleteHandler':deleteHandler
};
