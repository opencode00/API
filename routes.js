const router = require('express').Router();
const nDrive = require('./nDrive/nDrive');

// *version modulo (package.json "type":"module")
// *import {Router} from 'express';
// *const router = Router();

router.get('/ndrive',(req, res) => {
    content = nDrive.getFiles('d:\\Pedro');
    return res.json(content);
});



module.exports = router;