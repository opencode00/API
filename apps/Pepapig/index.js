const config = require('../../libs/utils');
const pepapig = require('express').Router();
const fetch = require('node-fetch');

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

// pepapig.get('/test', (req, res)=>{
//     return fetch('http://localhost:5001/pepapig/primitiva')
//     .then(res => res.text())
//     .then(data => res.send(data));
// });

// pepapig.get('/primitiva', (req,res)=>{
//     console.log('primitiva');
// });

// pepapig.get('/euromillones', (req,res)=>{
//     console.log('euromillones');
// });

module.exports = pepapig;