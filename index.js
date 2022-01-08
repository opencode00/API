const config = require('./libs/utils.js')
const express = require('express');
const fileUpload = require('express-fileupload');
const drive = require('./apps/Drive/index.js');
const pepa = require('./apps/Pepapig/index.js');

const port = config.params.PORT || 3000;
const app = express();

app.use(fileUpload());

app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({ extended: true}));

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
 
app.post('/login', (req, res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', '*');
    res.set('Access-Control-Allow-Methods', '*');
    
    if(req.body.user == config.params.USER && req.body.pass == config.params.USERPASS){
        console.log('ok');
        res.send(config.pass);
    }else{
        console.log('no');
        res.sendStatus(403);
    }
});

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})