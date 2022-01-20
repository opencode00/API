const config = require('../../libs/utils')
const drive = require('express').Router();
const nDrive = require('./nDrive');

drive.use(function (req, res, next){
    //if (req.query.key != config.pass) res.sendStatus(403);
    next();
});

function path(query){
    const base = String(config.params.INIT_DIR);
    if (String(query).includes(base)) return query;

    return base;
}

drive.get('/', (req, res)=>{
    res.render('template', {
        title: 'Serebro Drive',
        scripts: 
            `<script src="/js/drive.js"></script>
            <script src="/components/ui_star.js"></script>
            `,
    });
});

drive.get('/list',(req, res) => {
    content = nDrive.getFiles(path(req.query.path));
    return res.json(content);
});

drive.get('/viewFile',(req, res) => {
    const file = req.query.path;
    const content = nDrive.viewFile(`${file}`);
    console.log(content);
    res.setHeader('Content-type', nDrive.getMimeTypes(file));
    res.send(content);
});

//?path=<directorio actual>&dir=<nombre del directorio>
drive.get('/mkdir',(req, res) => {
    src = req.query.path;
    dir = req.query.dir;
    nDrive.mkdir(`${src}/${dir}`);
    res.send('');
});

// drive.get('/rm',(req, res) => {
//     file = req.query.path;
//     nDrive.rm(file);
//     res.send('');
// });

//?opath=<path de origen>&dpath=<path de destino>
drive.get('/mv',(req, res) => {
    src = req.query.opath;
    dest = req.query.dpath;
    nDrive.mv(src, dest);
    res.send('');
});

//?opath=<path de origen>&dpath=<path de destino>
drive.get('/cp',(req, res) => {
    src = req.query.opath;
    dest = req.query.dpath;
    nDrive.cp(src, dest);
    res.send('');
});

//path=<ruta relativa>&uploadFile=<fichero a subir>
drive.post('/upload',(req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    // res.set('Access-Control-Allow-Credentials', '*');
    // res.set('Access-Control-Allow-Methods', '*');

    // console.log(req.body.path)
    //console.log(req.files.uploadFile)
    const uploadPath = req.body.path;

    for (const file in req.files.uploadFile){
        //console.log(`${uploadPath}\\${req.files.uploadFile[file].name}`)
        nDrive.upload(uploadPath,req.files.uploadFile[file]);
    }
    res.send('Uploaded!');
});


module.exports = drive;