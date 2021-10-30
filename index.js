require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('./Drive//routes.js');

// *version modulo (package.json "type":"module")
// *import express from 'express';
// *import config from 'dotenv';
// *config.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(fileUpload());
app.use(express.static(__dirname+'/public'));

app.set('view engine', 'ejs');
app.set('views', './views');
// app.use(express.json()); //Modifica las cabeceras para enviar JSON, pero no interesa por netflix, spoty

app.get('/', (req, res)=>{
    res.render('landing');
});
app.get('/pepapig', (req,res)=>{
    res.render('pepapig');
});
app.use('/drive', routes);


app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})