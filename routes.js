const router = require('express').Router();
const nDrive = require('./nDrive');
require('dotenv').config();

// *version modulo (package.json "type":"module")
// *import {Router} from 'express';
// *const router = Router();
function path(query){
    const base = String(process.env.INIT_DIR);

    if (String(query).includes(base)) return query;

    return base;
}

router.get('/list',(req, res) => {
    content = nDrive.getFiles(path(req.query.path));
    return res.json(content);
});

router.get('/viewFile',(req, res) => {
    const file = req.query.path;
    const content = nDrive.viewFile(`${file}`);
    res.setHeader('Content-type', nDrive.getMimeTypes(file));
    res.send(content);
});

//?path=<directorio actual>&dir=<nombre del directorio>
router.get('/mkdir',(req, res) => {
    src = req.query.path;
    dir = req.query.dir;
    nDrive.mkdir(`${src}/${dir}`);
    res.send('');
});

router.get('/rm',(req, res) => {
    file = req.query.path;
    nDrive.rm(file);
    res.send('');
});

//?opath=<path de origen>&dpath=<path de destino>
router.get('/mv',(req, res) => {
    src = req.query.opath;
    dest = req.query.dpath;
    nDrive.mv(src, dest);
    res.send('');
});

//?opath=<path de origen>&dpath=<path de destino>
router.get('/cp',(req, res) => {
    src = req.query.opath;
    dest = req.query.dpath;
    nDrive.cp(src, dest);
    res.send('');
});


module.exports = router;