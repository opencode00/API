
function chassis(){
    explorer.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('dark');
    table.setAttribute('id', 'fileExplorerElement')
    table.style.color = '#CDD';
    table.style.width = '100%';
    table.innerHTML = '';

    return table;
}

function rowContent(element){
    row = `<input class="selectorItems" type="checkbox" id="sel_${element.name}"/>
    <a id="fav_${element.name}" class="icon tools" onclick="add2Fav(this)" title="Favorito" data-loc="${element.location}" data-name="${element.name}">F|</a> 
    <a id="share_${element.name}" class="icon tools" onclick="add2share(this)" title="Share" data-loc="${element.location}" data-name="${element.name}">S|</a> 
    <a class="icon tools" onclick="rename(this)">R</a> 
    <a class="files" onclick="view(this)" data-loc="${element.location}">${element.name}</a> &nbsp;&nbsp;&nbsp;&nbsp; ${element.size}`
    return row;
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

function buildLeftMenu(){
    let content = `
    <div class="vmenu_item icon"><a onclick="data('${APY}/drive/list?key=${KEY}', drive)">Mi Unidad</a></div>
    <div class="vmenu_item icon"><a onclick="data('${APY}/drive/list?key=${KEY}', shared)">Compartidos</a></div>
    <div class="vmenu_item icon"><a onclick="data('${APY}/drive/list?key=${KEY}', favs)">Favoritos</a></div>
    `;

    document.getElementById('izquierda').innerHTML = content
}

function buildRightMenu(){
    const content = `
    <div class="vmenu_item icon"><a class="icon tools" onclick="copy()"> Copiar</a></div>
    <div class="vmenu_item icon"><a class="icon tools" id="pasteTool" onclick="paste()"> Pegar </a> </div>
    <div class="vmenu_item icon"><a class="icon tools" onclick="newDir()"> +Carpeta </a></div>
    `;
    document.getElementById('derecha').innerHTML += content
}

function giveFavs(el){
    ul = document.createElement('ul')
    content = ''
    fetch(`${APY}/listman/get/Favoritos?key=${KEY}`)
    .then(res => res.json())
    .then(data => {
        data.forEach((ref => {
            content += `<li>
                        <a onclick="remove(this)" data-loc="${ref[0]}" class="icon ">X</a>
                        <a onclick="view(this)" data-loc=${ref[6]}>${ref[1]}</a>
                        </li>` 
        }))
        ul.innerHTML = content
        el.appendChild(ul)
    })
}

function remove(el){
    id = el.dataset.loc
    li = el.parentNode
    ul = li.parentNode
    ul.removeChild(li)

    fetch(`${APY}/listman/remove/${id}?key=${KEY}`)
}