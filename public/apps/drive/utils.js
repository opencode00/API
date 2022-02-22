function cd(element){
    fetch(`${API}drive/list?key=${KEY}&path=${element.dataset.loc}`)
    .then(res => res.json())
    .then((data)=>{
        drive(data);
    })
}

function back(path){
    return path.substring(0,path.lastIndexOf(DIR_SEP))
}


function view(element){
    window.open(`${API}drive/viewFile?key=${KEY}&path=${element.dataset.loc}`, '_blank')
}

function copy(){
    const table = document.getElementById('fileExplorerElement').getElementsByClassName('selectorItems')
    let value;
    let files = [];
    files.push(document.getElementById('currentPath').value+DIR_SEP)
    for (let i = 0; i< table.length; i++){
        value = table[i].attributes.id.value;
        
        if (table[i].checked == true)
            files.push(value.replace('sel_',''))
    }
    sessionStorage.setItem('files', files)
    document.getElementById('pasteTool').classList.remove('disabled')
}

function paste(){
    dst = document.getElementById('currentPath').value;
    files = sessionStorage.getItem('files').split(',');
    src = files.shift();
    files.forEach(file=>{
        fetch(`${API}drive/cp?opath=${src}${file}&dpath=${dst}${DIR_SEP}${file}`)
    });
    document.getElementById('pasteTool').classList.add('disabled')
    sessionStorage.removeItem('files');
    cd(document.getElementById('currentPath'));
}

function newDir(){
    xTool = document.getElementById('multiTool');
    xTool.classList.toggle('disabled');
    cPath = document.getElementById('currentPath');
    xText = document.getElementById('multiText');
    xText.value = '';
    xButton = document.getElementById('multiButton');
    xButton.innerHTML="New Dir";
    xButton.addEventListener('click',()=>{
        fetch(`${API}drive/mkdir?path=${cPath.value}&dir=${xText.value}`);
        xButton.innerHTML= '';
        xText.value= '';
        xTool.classList.add('disabled');
        cd(cPath);
    });
}

function rename(element){
    xTool = document.getElementById('multiTool');
    xTool.classList.toggle('disabled');
    cPath = document.getElementById('currentPath');
    xText = document.getElementById('multiText');
    xButton = document.getElementById('multiButton');
    xButton.innerHTML="Rename";
    xText.value = element.nextElementSibling.innerHTML;
    xButton.addEventListener('click',()=>{
        fetch(`${API}drive/mv?opath=${element.nextElementSibling.dataset.loc}&dpath=${cPath.value+DIR_SEP+xText.value}`);
        xButton.innerHTML= '';76
        xText.value= '';
        xTool.classList.add('disabled');
        cd(cPath);
    });
}

function dragover(event){
    event.stopPropagation();
    event.preventDefault();
    document.querySelector('#overlay').style.display="block";   
}

function dragleave(event){
    event.stopPropagation();
    event.preventDefault();
    document.querySelector('#overlay').style.display="none";
}

function drop(event){
    event.stopPropagation();
    event.preventDefault();

    const transfers = event.dataTransfer;
    const frmData = new FormData();
    frmData.append('path', document.getElementById('currentPath').value);

    // console.log(event.dataTransfer);
    for (let i = 0; i < transfers.items.length; i++){
        // console.log(transfers.items[i]);
        if(transfers.items[i].kind == 'file'){
            frmData.append('uploadFile', transfers.files[i], transfers.files[i].name);
            //console.log(transfers.files[i]);
        }
    }
    fetch(`${API}drive/upload?key=${KEY}`, { 
        method: "POST",
        body: frmData
    });
    cd(document.getElementById('currentPath'));
    document.querySelector('#overlay').style.display="none";
}

function add2Fav(id){
    element = document.getElementById(id);
    element.toggleAttribute('selected');
}
