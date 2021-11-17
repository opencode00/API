const config = require('./libs/utils')
const express = require('express');
const fileUpload = require('express-fileupload');
const drive = require('./Drive/index.js');
const pepa = require('./Pepapig/index.js');
// const { json } = require('express');

const port = config.params.PORT || 3000;
const app = express();

app.use(fileUpload());

app.use(express.static(__dirname+'/public'));
app.use('/pepapig', pepa);
app.use('/drive', drive);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res)=>{
    if (req.query.key == config.pass)
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
        res.send(config.pass);
    }else{
        console.log('no');
        res.sendStatus(403);
    }
});

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})