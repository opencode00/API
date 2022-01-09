const explorer = document.querySelector('#content')
document.addEventListener('DOMContentLoaded', init());


// let back = '';
const table = document.createElement('table');
table.classList.add('table');
table.classList.add('dark');
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
    let content = `
        <a onclick="cd(this)" data-loc="${back(data[2])}" style="cursor: pointer"> ^ UP </a> - ${data[2]}
        <input type="hidden" value="${data[2]}" id="currentPath"/>
        <a class="icon tools"> &#xa9; </a> 
        <a class="icon tools"> &#x2708; </a> 
        <a class="icon tools"> &#x2117; </a> 
        `;
    
    //Table Headers
    table.appendChild(buildRow(content, {colspan: 1}, true))
    //Directorios
    data[0].forEach(element => {
        content = `<a class="dirs" onclick="cd(this)" data-loc="${element.location}">${element.name}</a>`
        table.appendChild(buildRow(content));
    });
    //Ficheros
    data[1].forEach(element => {
        content = `
            <input type="checkbox" id="sel_${element.name}"/>
            <!--<span class="icon" id="share_${element.name}" onclick="add2share(share_${element.name})" >&#x273B;</span>-->
            <ui-star class="icon" id="star_${element.name}" onclick="add2Fav('star_${element.name}')"></ui-star> 
            <a class="files" onclick="view(this)" data-loc="${element.location}">${element.name}</a> &nbsp;&nbsp;&nbsp;&nbsp; ${element.size}`
        table.appendChild(buildRow(content));
    });
    explorer.appendChild(table);
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
    let frmData;
    
    // console.log(event.dataTransfer);
    for (let i = 0; i < transfers.items.length; i++){
        console.log(transfers.files[i].name);
        if(transfers.items.kind == 'file'){
            frmData = new FormData();
            frmData.append('path',document.getElementById('currentPath').value);
            frmData.append('file', transfers.files[i].name);
            // fetch(`${API}upload`, document.getElementById('currentPath').value)
        }
    }

    // console.log(document.getElementById('currentPath').value);
    document.querySelector('#overlay').style.display="none";
}
dropzone.addEventListener('dragover', dragover);
dropzone.addEventListener('dragleave', dragleave);
dropzone.addEventListener('drop', drop);