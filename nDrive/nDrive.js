const fs = require('fs');
//const fs = require('fsPromises');
const mime = require('mime-types');
const paths = require('path');

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
                    entry.type= "Directory";
                    dirs.push(entry);
                }
                if (element.isFile()){
                    entry.name = element.name;
                    entry.location = paths.normalize(`${path}/${element.name}`);
                    entry.type = getMimeTypes(entry.location) || 'File';
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
    if (fs.statSync(path).isFile()){
        return fs.readFileSync(path);
    }
}

function rm(path){
    if (fs.statSync(path).isFile()){
        fs.unlink(path, (err) => {
            if (err) throw err;
        });
    }
}

function rmrf(path){
    if (fs.statSync(path).isDirectory()){
        fsPromises.rm(path,{recursive: true, force: true});
    }
}

function mv(oPath,dPath){
    fs.rename(oPath,dPath, (err) => {
        if (err) throw err;
    });
}

module.exports = {getFiles, viewFile, getMimeTypes, rm, mv};
