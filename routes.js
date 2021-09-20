const router = require('express').Router();
const { response } = require('express');
const nDrive = require('./nDrive/nDrive');

// *version modulo (package.json "type":"module")
// *import {Router} from 'express';
// *const router = Router();

router.get('/list',(req, res) => {
    content = nDrive.getFiles(req.query.path);
    return res.json(content);
});

router.get('/viewFile',(req, res) => {
    const file = req.query.path;
    const content = nDrive.viewFile(`${file}`);
    res.setHeader('Content-type', nDrive.getMimeTypes(file));
    res.send(content);
});

router.get('/rmFile',(req, res) => {
    file = req.query.path;
    nDrive.rm(file);
    res.send('');
});

router.get('/mvFile',(req, res) => {
    src = req.query.opath;
    dest = req.query.dpath;
    nDrive.mv(src, dest);
    res.send('');
});


module.exports = router;