const explorer = document.querySelector('#content')
document.addEventListener('DOMContentLoaded', init());

const dropzone = document.querySelector('body');

function init(){
    buildLeftMenu();
    data(`${APY}/drive/list?key=${KEY}`, drive);
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
        <a onclick="cd(this)" data-loc="${back(data[0])}" style="cursor: pointer"> ^ UP </a> - ${data[0]}
        <input type="hidden" value="${data[0]}" id="currentPath" data-loc="${data[0]}"/> | 
        <a class="icon tools" onclick="copy()"> &#xa9; </a>
        <a class="icon tools" id="pasteTool" onclick="paste()"> &#x2117; </a> 
        <a class="icon tools" onclick="newDir()">&#10010; </a> 
        `;
        
    table.appendChild(buildRow(content, {colspan: 1}, true))

    //Directorios
    data[1].forEach(element => {
        content = `<a class="dirs" onclick="cd(this)" data-loc="${element.location}">${element.name}</a>`
        table.appendChild(buildRow(content));
    });
    
    //Ficheros
    data[2].forEach(element => {
        content = rowContent(element);
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
    giveFavs(explorer);
}