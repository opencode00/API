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
        res.render('landing', {title: '{(Serebro.v2)}'});
    else
    // res.render('landing', {title: '{(Serebro.v2)}'});
        res.render('login', {title: '{(Serebro.v2)}'});
    });

app.get('/login/:user/:password', (req, res)=>{
    // console.log(req.params.user);
    // console.log(req.params.password);
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
    res.render('pepapig', {title: 'PepaPig Project'});
});


app.use('/drive', routes);


app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})