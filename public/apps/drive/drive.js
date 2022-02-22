const explorer = document.querySelector('#content')
document.addEventListener('DOMContentLoaded', init());

const dropzone = document.querySelector('body');

function init(){
    buildLeftMenu();
    data(`${API}drive/list?key=${KEY}`, drive);
}

function data(url, callback){
    fetch(url)
    .then(res=> res.json())
    .then (data=>{
        callback(data);
    })
}


function drive(data){
    const table = chassis();
    overlay = document.createElement('div');
    overlay.setAttribute('id','overlay');
    document.querySelector('body').appendChild(overlay);
    
    multitool = document.createElement('div');
    multitool.setAttribute('id', 'multiTool');
    multitool.setAttribute('class', 'disabled');
    document.querySelector('body').appendChild(multitool);
    document.getElementById('multiTool').innerHTML = '<input class="w12" type="text" id="multiText"/> <button id="multiButton"></button>';

    //Header
    let content = `
        <a onclick="cd(this)" data-loc="${back(data[2])}" style="cursor: pointer"> ^ UP </a> - ${data[2]}
        <input type="hidden" value="${data[2]}" id="currentPath" data-loc="${data[2]}"/> | 
        <a class="icon tools" onclick="copy()"> &#xa9; </a>
        <a class="icon tools" id="pasteTool" onclick="paste()"> &#x2117; </a> 
        <a class="icon tools" onclick="newDir()">&#10010; </a> 
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
            <a id="fav_${element.name}" class="icon tools" onclick="add2Fav('star_${element.name}')" title="Favorito">F|</a> 
            <a id="share_${element.name}" class="icon tools" onclick="add2share('share_${element.name}')" title="Share">S|</a> 
            <a class="icon tools" onclick="rename(this)">R</a> 
            <a class="files" onclick="view(this)" data-loc="${element.location}">${element.name}</a> &nbsp;&nbsp;&nbsp;&nbsp; ${element.size}`
        table.appendChild(buildRow(content));
    });
    explorer.appendChild(table);
    if (sessionStorage.getItem('files') == null)
        document.getElementById('pasteTool').classList.add('disabled')

    dropzone.addEventListener('dragover', dragover);
    dropzone.addEventListener('dragleave', dragleave);
    dropzone.addEventListener('drop', drop);
}

function shared(data){
    const table = chassis();
    //Header
    let content = `Shared`;
    table.appendChild(buildRow(content, {colspan: 1}, true))
    explorer.appendChild(table);
}

function favs(data){
    const table = chassis();
    //Header
    let content = `Favoritos`;
    table.appendChild(buildRow(content, {colspan: 1}, true))
    explorer.appendChild(table);
}