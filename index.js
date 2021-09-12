const express = require('express');
const env = require('dotenv').config();
const routes = require('./routes.js');

// *version modulo (package.json "type":"module")
// *import express from 'express';
// *import config from 'dotenv';
// *config.config();

const port = process.env.PORT || 3000;

const app = express();
app.use('/', routes);
// app.use(express.json()); //Modifica las cabeceras para enviar JSON, pero no interesa por netflix, spoty

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})