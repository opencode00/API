require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('./Drive//routes.js');
const cookieParser = require('cookie-parser')

// *version modulo (package.json "type":"module")
// *import express from 'express';
// *import config from 'dotenv';
// *config.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));

app.set('view engine', 'ejs');
app.set('views', './views');
// app.use(express.json()); //Modifica las cabeceras para enviar JSON, pero no interesa por netflix, spoty

app.get('/', (req, res)=>{
    if (req.cookies.auth == 'porquesi')
        res.send('Cojonudo');
    else
    // res.render('landing', {title: '{(Serebro.v2)}'});
        res.render('login', {title: '{(Serebro.v2)}'});
    });

app.get('/login/:user/:password', (req, res)=>{
    if(req.params.user == 'OpenCode' && req.params.password == '1234'){
        res.cookie('auth', 'porquesi',{sameSite: 'none', secure: true, expire: getExpire()}).send('yes');

    }else{
        console.log('no');
        res.send('');
    }
});

app.get('/pepapig', (req,res)=>{
    res.render('pepapig', {title: 'PepaPig Project'});
});


app.use('/drive', routes);


app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})

function getExpire(){
    tomorrow = new Date();
    return tomorrow.setHours(tomorrow.getHours()+1)
}