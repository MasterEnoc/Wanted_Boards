const express = require('express');
const {readFile} = require('fs');
const {router} = require('./routes/loginRender.js');
const {verifyLogin} = require('./routes/loginVerify.js');

const app = express();

app.set('views', './app/views');
app.set('view engine', 'pug');

app.use(express.static('app/pages/static/', {index:false}));
app.use(express.urlencoded({extended:true}));

app.get('/', router);

app.post('/login', verifyLogin);

app.listen(8888);
