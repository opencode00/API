const config = require('./libs/utils.js')
const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const fs = require('fs')
// const drive = require('./apps/Drive/index.js');

const port = config.params.PORT || 3000;
const app = express();

app.use(fileUpload());
app.use(cookieParser());

app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({ extended: true}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req,res)=>{
    fs.writeFile('public/js/config.js', writeConfig(req.cookies.key) ,(err) => {
        if (err) throw err;
    });
    if ('key' in req.query && req.query.key == req.cookies.key){
        res.render('template', {
            title: '{<(Serebro.v2)>}',
            scripts: ''
        });
    }else
        res.render('login', {title: '{(Serebro.v2)}'});
});

app.get('/:app', (req, res)=>{
    if (req.query.key != req.cookies.key) res.sendStatus(403);
    res.render(req.params.app, {
        title: '{<(Serebro.v2)>}',
        scripts: ''
    });
    
});

function writeConfig(key){
    content = `const APY = '${config.params.APY}'\n`;
    content += `const KEY = '${key}'`
    content += `const DIR_SEP = '${config.params.DIR_SEP}'\n`;
    return content
}

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})