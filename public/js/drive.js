const dirs = document.querySelector('#content')
document.addEventListener('DOMContentLoaded', init());

function init(){
    fetch('http://localhost:5000/drive/list')
    .then(res=> res.json())
    .then ((data)=>{
        data[0].forEach(element => {
            dirs.innerHTML += `<div><a onclick="cd(this)" data-src="" data-loc="${element.location}">${element.name}</a></div>`
        });
        data[1].forEach(element => {
            dirs.innerHTML += `<div>${element.name}</div>`
        });
    })
}
function cd(element){
    const back = element.dataset.loc.toString().replace(element.innerHTML,'');
    console.log(`${element.innerHTML} : ${back}`)
    dirs.innerHTML = `<div><a onclick="cd(this)" data-loc="${back}">..</a></div>`;
    fetch(`http://localhost:5000/drive/list?path=${element.dataset.loc}`)
    .then(res => res.json())
    .then((data)=>{
        data[0].forEach(element => {
            dirs.innerHTML += `<div><a onclick="cd(this)" data-src=""" data-loc="${element.location}">${element.name}</a></div>`
        });
        data[1].forEach(element => {
            dirs.innerHTML += `<div>${element.name}</div>`
        });                
    })  
}