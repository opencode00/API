const config = require('../libs/utils');
const pepapig = require('express').Router();
const sheetApi = require("../libs/sheetApi.js");
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

pepapig.get('/primitiva', (req,res)=>{
     sheetApi.query(client, '1vPL4MhtBubbieSa740ugNfbaip1tPFPg6UyO9fDaGqs','PCombinaciones!B2:J18', (data)=>{
        let allCombs = [];
        const gral = [];
        const jue = [];
        const sab = [];
        const cols = [];
        const juecols = [];
        const sabcols = [];
        const magica1 = [];
        const magica2 = [];
        const magica3 = [];
        
        gral.push('Gral');
        jue.push('Jueves');
        sab.push('Sabado');
        cols.push('Columnas');
        juecols.push('Jue Cols');
        sabcols.push('Sab Cols');
        magica1.push('Magica 1');
        magica2.push('Magica 2');
        magica3.push('Magica 3');

        elements = data.data.values;
        elements.forEach((element, index)=>{
            if(index < 7){
                gral.push(element[0]);
                jue.push(element[1]);
                sab.push(element[2]);
                cols.push(element[3]);
                juecols.push(element[4]);
                sabcols.push(element[5]);
                magica1.push(element[6]);
                magica2.push(element[7]);
                magica3.push(element[8]);
            }
        });
        gral.push(elements[16][0]);
        jue.push(elements[16][1]);
        sab.push(elements[16][2]);
        cols.push(elements[16][3]);
        juecols.push(elements[16][4]);
        sabcols.push(elements[16][5]);
        magica1.push(elements[16][6]);
        magica2.push(elements[16][7]);
        magica3.push(elements[16][8]);
        
        allCombs.push(gral);
        allCombs.push(jue);
        allCombs.push(sab);
        allCombs.push(cols);
        allCombs.push(juecols);
        allCombs.push(sabcols);
        allCombs.push(magica1);
        allCombs.push(magica2);
        allCombs.push(magica3);
        res.send(allCombs);
    });
});

pepapig.get('/euromillones', (req,res)=>{
    sheetApi.query(client, '1gdX7muSouFlQzT8Vjwf7_vxttLqEIPJYOiM5tybScjs','EMCombinaciones!B3:J21', (data)=>{
        console.log(data);
        let allCombs = [];
        const gral = [];
        const jue = [];
        const sab = [];
        const cols = [];
        const marcols = [];
        const viecols = [];
        const magica1 = [];
        const magica2 = [];
        const magica3 = [];
        const stars = [];
        
        gral.push('Gral');
        jue.push('Martes');
        sab.push('Viernes');
        cols.push('Columnas');
        marcols.push('Mar Cols');
        viecols.push('Vie Cols');
        magica1.push('Magica 1');
        magica2.push('Magica 2');
        magica3.push('Magica 3');

        elements = data.data.values;
        elements.forEach((element, index)=>{
            if(index < 7){
                gral.push(element[0]);
                jue.push(element[1]);
                sab.push(element[2]);
                cols.push(element[3]);
                marcols.push(element[4]);
                viecols.push(element[5]);
                magica1.push(element[6]);
                magica2.push(element[7]);
                magica3.push(element[8]);
            }
        });
        gral.push(elements[15][0]);
        jue.push(elements[15][1]);
        sab.push(elements[15][2]);
        cols.push(elements[15][3]);
        marcols.push(elements[15][4]);
        viecols.push(elements[15][5]);
        magica1.push(elements[15][6]);
        magica2.push(elements[15][7]);
        magica3.push(elements[15][8]);

        gral.push(elements[16][0]);
        jue.push(elements[16][1]);
        sab.push(elements[16][2]);
        cols.push(elements[16][3]);
        marcols.push(elements[16][4]);
        viecols.push(elements[16][5]);
        magica1.push(elements[16][6]);
        magica2.push(elements[16][7]);
        magica3.push(elements[16][8]);
        
        allCombs.push(gral);
        allCombs.push(jue);
        allCombs.push(sab);
        allCombs.push(cols);
        allCombs.push(marcols);
        allCombs.push(viecols);
        allCombs.push(magica1);
        allCombs.push(magica2);
        allCombs.push(magica3);
        allCombs.push(elements[17]);
        allCombs.push(elements[18]);
        console.log(allCombs);
        // res.send(allCombs);
    });
});

module.exports = pepapig;