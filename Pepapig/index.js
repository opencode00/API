const config = require('../libs/utils');
const pepapig = require('express').Router();
const sheetApi = require("../libs/sheetApi.js");

pepapig.use(function (req, res, next){
    if (req.query.key != config.pass) res.sendStatus(403);
    next();
});

pepapig.get('/', (req,res)=>{
    res.render('template', {
        title: 'PepaPig Project', 
        scripts: `
            <script src="/components/ui_card.js"></script>
            <script src="/js/pepapig.js"></script>
        `
    });
});

pepapig.get('/primitiva', (req,res)=>{
    const client = sheetApi.getClient();
    sheetApi.query(client, '1vPL4MhtBubbieSa740ugNfbaip1tPFPg6UyO9fDaGqs','PCombinaciones!A1:G18', (data)=>{
        res.send(data.data.values);
    });
});

pepapig.get('/euromillones', (req,res)=>{
    const client = sheetApi.getClient();
    sheetApi.query(client, '1vPL4MhtBubbieSa740ugNfbaip1tPFPg6UyO9fDaGqs','PCombinaciones!A1:G18', (data)=>{
        res.send(data.data.values);
    });
});

module.exports = pepapig;