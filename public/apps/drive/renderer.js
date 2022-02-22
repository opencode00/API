
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