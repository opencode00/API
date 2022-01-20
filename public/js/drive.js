const explorer = document.querySelector('#content')
document.addEventListener('DOMContentLoaded', init());


// let back = '';
const table = document.createElement('table');
table.classList.add('table');
table.classList.add('dark');
table.setAttribute('id', 'fileExplorerElement')
table.style.color = '#CDD';
table.style.width = '90%';

const dropzone = document.querySelector('body');


function init(){
    overlay = document.createElement('div');
    overlay.setAttribute('id','overlay');
    document.querySelector('body').appendChild(overlay);
    buildLeftMenu();
    fetch(`${API}drive/list?key=${KEY}`)
    .then(res=> res.json())
    .then (data=>{
        render(data);
    })
}

function cd(element){
    fetch(`${API}drive/list?key=${KEY}&path=${element.dataset.loc}`)
    .then(res => res.json())
    .then((data)=>{
        render(data);
    })
}

function back(path){
    return path.substring(0,path.lastIndexOf(DIR_SEP))
}

function render(data){
    table.innerHTML = '';
    //Header
    let content = `
        <a onclick="cd(this)" data-loc="${back(data[2])}" style="cursor: pointer"> ^ UP </a> - ${data[2]}
        <input type="hidden" value="${data[2]}" id="currentPath" data-loc="${data[2]}"/> | 
        <a class="icon tools" onclick="copy()"> &#xa9; </a>
        <a class="icon tools" id="pasteTool" onclick="paste()"> &#x2117; </a> 
        <a class="icon tools" onclick="share()"> &#9901; </a> 
        <a class="icon tools" onclick="newDir()">&#10010; </a> 
        <div id="multiTool" class="disabled"><input type="text" id="multiText"/> <button id="multiButton"></button></div>
        `;
        
    table.appendChild(buildRow(content, {colspan: 1}, true))

    //Directorios
    data[0].forEach(element => {
        content = `<a class="dirs" onclick="cd(this)" data-loc="${element.location}">${element.name}</a>`
        table.appendChild(buildRow(content));
    });
    //Ficheros
    data[1].forEach(element => {
        content = `
            <input class="selectorItems" type="checkbox" id="sel_${element.name}"/>
            <ui-star class="icon" id="star_${element.name}" onclick="add2Fav('star_${element.name}')"></ui-star> 
            <a class="icon tools" onclick="rename(this)"> &#174; </a> 
            <a class="files" onclick="view(this)" data-loc="${element.location}">${element.name}</a> &nbsp;&nbsp;&nbsp;&nbsp; ${element.size}`
        table.appendChild(buildRow(content));
    });
    explorer.appendChild(table);
    if (sessionStorage.getItem('files') == null)
        document.getElementById('pasteTool').classList.add('disabled')
}

function buildRow(content, attrs = false, header = false){
    let row = document.createElement('tr');
    if (header) 
        row = document.createElement('th');
    
    let cell = document.createElement('td');
    if (attrs){
        for (let i = 0; i< Object.keys(attrs).length; i++){
            cell.setAttribute(Object.keys(attrs)[i],Object.values(attrs)[i]);
        }
    }
    cell.innerHTML = content;
    row.appendChild(cell)

    return row;
}

function view(element){
    window.open(`${API}drive/viewFile?key=${KEY}&path=${element.dataset.loc}`, '_blank')
}

function buildLeftMenu(){
    let content = `
    <ul>
        <li><a href=${API}drive?key=${KEY}>Mi Unidad</a></li>
        <li>Compartidos</li>
        <li>Favoritos</li>
        <li></li>
    </ul>
    `;

    document.getElementById('left').innerHTML = content
}

function add2Fav(id){
    element = document.getElementById(id);
    element.toggleAttribute('selected');
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
    fetch(`${API}drive/upload`, { 
        method: "POST",
        body: frmData
    });
    cd(document.getElementById('currentPath'));
    document.querySelector('#overlay').style.display="none";
}

dropzone.addEventListener('dragover', dragover);
dropzone.addEventListener('dragleave', dragleave);
dropzone.addEventListener('drop', drop);