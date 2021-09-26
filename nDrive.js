const fs = require('fs');
//const fs = require('fsPromises');
const mime = require('mime-types');
const paths = require('path');
const { response } = require('express');

// Extrae los parametros de la línea de comandos.
// const args = process.argv.slice(2);
// const absPath = args[0];

/**
 * getFiles(path)
 * @param path (string) absolute path of file or directory 
 * @returns JSON of directories and files with name and location or 'file' word in case path == file
 */
function getFiles(path){
    tree = [];
    dirs = [];
    files = [];
    if (fs.existsSync(path)){
        if (fs.statSync(path).isDirectory())
            fs.readdirSync(path,{ withFileTypes: true }).forEach(element => {
                entry = {};
                if (element.isDirectory()){
                    entry.name = element.name;
                    entry.location = paths.normalize(`${path}/${element.name}`); 
                    dirs.push(entry);
                }
                if (element.isFile()){
                    entry.name = element.name;
                    entry.location = paths.normalize(`${path}/${element.name}`);
                    files.push(entry);
                }
            });
            tree.push(dirs);
            tree.push(files);
            return tree;
            //return JSON.stringify(tree);
    }
    return false;
}
/**
 * getMimeTypes(path)
 * @param path (string) absolute path of file or directory 
 * @returns if file return its mime type, if dir return false
 */
function getMimeTypes(path){
    return mime.lookup(path);
}

function viewFile(path){
    try{
        if (fs.statSync(path).isFile() && fs.existsSync(path)){
            return fs.readFileSync(path);
        }
    }catch(error){
        return error;

    }
}

function mkdir(path){
    try{
        fs.mkdir(path, (err) => {
            if (err) throw err;
        });
    }catch(error){
        throw error;
    }
}

function rm(path){
    try{
        fs.unlink(path, (err) => {
            if (err) throw err;
        });
    }catch(error){
        throw error;
    }
}

// function rmrf(path){
//     if (fs.statSync(path).isDirectory()){
//         fsPromises.rm(path,{recursive: true, force: true});
//     }
// }

function mv(oPath,dPath){
    try{
        fs.rename(oPath,dPath, (err) => {
            if (err) throw err;
        });
    }catch(error){
        throw error;
    }
}

function cp(oPath,dPath){
    try{
        fs.cp(oPath,dPath, (err) => {
            if (err) throw err;
        });
    }catch(error){
        throw error;
    }
}

function upload(oPath,file){
    file.mv(oPath, function(err){
        if (err) throw err;
    });
}

module.exports = {getFiles, viewFile, getMimeTypes, mkdir, rm, mv, cp, upload};
