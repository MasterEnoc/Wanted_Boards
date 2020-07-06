const express = require('express');
const {readFile} = require('fs');
const {loginRouter} = require('./routes/loginRouting');
const {userPathHandler} = require('./routes/userPathHandler');

const {usersPath} = require('./userPath');
const app = express();

app.set('views', './app/views');
app.set('view engine', 'pug');

app.use(express.static('app/static/', {index:false}));
app.use('/login',express.static('app/static/', {index:false}));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.redirect('/login');
});

app.all('/login', loginRouter);

app.get(/\/[`$(usersPath)`]/, (req, res)=> userPathHandler(req, res));

app.listen(8888);
