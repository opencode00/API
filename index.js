require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('./Drive//routes.js');
const cookieParser = require('cookie-parser');
const md5 = require("md5");

// *version modulo (package.json "type":"module")
// *import express from 'express';
// *import config from 'dotenv';
// *config.config();

const pass = md5(process.env.KEY+ new Date().getHours())
const port = process.env.PORT || 3000;
const app = express();

app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));

app.set('view engine', 'ejs');
app.set('views', './views');
// app.use(express.json()); //Modifica las cabeceras para enviar JSON, pero no interesa por netflix, spoty

app.get('/', (req, res)=>{
    if (req.query.key == pass)
        res.render('template', {
            title: '{(Serebro.v2)}',
            scripts: ''
        });
    else
        res.render('login', {title: '{(Serebro.v2)}'});
});

app.get('/login/:user/:password', (req, res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', '*');
    if(req.params.user == 'OpenCode' && req.params.password == '1234'){
        console.log('ok');
        // res.cookie('auth', 'porquesi',{sameSite: 'none', secure: true}).sendStatus(200);
        res.send(pass);
    }else{
        console.log('no');
        res.sendStatus(403);
    }
});

app.get('/pepapig', (req,res)=>{
    if (req.query.key != pass) res.sendStatus(403);
    res.render('template', {
        title: 'PepaPig Project', 
        scripts: '<script src="/components/ui_card.js"></script><script src="/js/pepapig.js"></script>'
    });
});


app.use('/drive', routes);


app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})