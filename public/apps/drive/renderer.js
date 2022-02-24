
function chassis(){
    explorer.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('dark');
    table.setAttribute('id', 'fileExplorerElement')
    table.style.color = '#CDD';
    table.style.width = '90%';
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
    <div><a onclick="data('${API}drive/list?key=${KEY}', drive)">Mi Unidad</a></div>
    <div><a onclick="data('https://jsonplaceholder.typicode.com/todos/1', shared)">Compartidos</a></div>
    <div><a onclick="data('https://jsonplaceholder.typicode.com/todos/1', favs)">Destacados</a></div>
    `;
    // let content = `
    // <div><a href=${API}drive?key=${KEY}>Mi Unidad</a></div>
    // <div><a href=${API}drive?key=${KEY}&app=shared>Compartidos</a></div>
    // <div><a href=${API}drive?key=${KEY}&app=favs>Destacados</a></div>
    // `;

    document.getElementById('left').innerHTML = content
}