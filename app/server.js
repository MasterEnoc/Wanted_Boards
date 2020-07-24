const express = require('express');
const {readFile} = require('fs');
const {loginRouter} = require('./routes/loginRouting');
const {userRouter, userRouterBoard, updateBoard, deleteBoard} = require('./routes/userPathRouter');

const app = express();

app.set('views', './app/views');
app.set('view engine', 'pug');

app.use(express.static('app/static/', {index:false}));
app.use(express.urlencoded({extended:true}));


// Takes the first get and redirects to the /login path

app.get('/', (req, res)=>{
    res.redirect('/login');
});

app.all('/login', loginRouter);

app.use(/\/([^/])*/, [userRouter, updateBoard, deleteBoard, userRouterBoard]);

// Error handling generic middleware, if an error is found in any
// middleware, the user will be redirected to the error page

app.use((err, req, res, next)=>{
    res.status(500);
    res.render('error', (err, html)=>{
        res.send(html);
    });
});

app.listen(8888);
