const config = require('../../libs/utils');
const pepapig = require('express').Router();
const sheetApi = require("../../libs/sheetApi.js");
const fetch = require('node-fetch');
const client = sheetApi.getClient();

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

pepapig.get('/primitiva', (req,res)=>{
    console.log('primitiva');
     sheetApi.query(client, '1vPL4MhtBubbieSa740ugNfbaip1tPFPg6UyO9fDaGqs','PCombinaciones!B3:F12', (data)=>{
        let allCombs = [];
        const freq = [];
        const medio = [];
        const last = [];
        const jue = [];
        const sab = [];
        
        freq.push('masFreq');
        medio.push('Medio');
        last.push('Ultimas');
        jue.push('Jueves');
        sab.push('Sabado');

        elements = data.data.values;
        elements.forEach((element, index)=>{
            freq.push(element[0]);
            medio.push(element[1]);
            last.push(element[2]);
            jue.push(element[3]);
            sab.push(element[4]);
        });
       
        allCombs.push(freq);
        allCombs.push(medio);
        allCombs.push(last);
        allCombs.push(jue);
        allCombs.push(sab);
        // console.log(allCombs);
        res.send(allCombs);
    });
});

pepapig.get('/euromillones', (req,res)=>{
    sheetApi.query(client, '1gdX7muSouFlQzT8Vjwf7_vxttLqEIPJYOiM5tybScjs','EMCombinaciones!B3:J15', (data)=>{
        let allCombs = [];
        const gral = [];
        const medio = [];
        const last = [];
        const jue = [];
        const sab = [];
        const stars = [];
        
        gral.push('MasFreq');
        medio.push('Medio');
        last.push('Ultimas');
        jue.push('Jueves');
        sab.push('Sabado');
        stars.push('Estrellas')
        
        elements = data.data.values;
        elements.forEach((element, index)=>{
            if(index<11){
                gral.push(element[0]);
                medio.push(element[1]);
                last.push(element[2]);
                jue.push(element[3]);
                sab.push(element[4]);
            }
        });
        stars.push('Top Pairs');
        stars.push(elements[11][0]);
        stars.push(elements[11][1]);
        stars.push('Top Gral');
        stars.push(elements[12][0]);
        stars.push(elements[12][1]);
      
       
        allCombs.push(gral);
        allCombs.push(medio);
        allCombs.push(last);
        allCombs.push(jue);
        allCombs.push(sab);
        allCombs.push(stars);
        
        // console.log(allCombs);
        res.send(allCombs);
    });
});

module.exports = pepapig;