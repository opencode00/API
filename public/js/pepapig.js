const divcontent= document.querySelector('#content')

const divprimi = document.createElement('ui-card');
divprimi.setAttribute('id', 'primitiva');

const diveuro = document.createElement('ui-card');
diveuro.setAttribute('id', 'euromillones');

divcontent.appendChild(divprimi);
divcontent.appendChild(diveuro);

const primi = document.querySelector('#primitiva')
const euro = document.querySelector('#euromillones')

let content ='';

fetch(APY+'pepapig/primitiva')
.then(res=>res.json())
.then((data)=>{
    content= '';
    data.forEach(element => {
        content += `<div><span style="font-size: bold">${element[0]}</div>`
        content += `<div>${element[1]}-${element[2]}-${element[3]}-${element[4]}-${element[5]}-${element[6]}::${element[7]}</div>`
        content += `<div><span style="color: red; font-size: bold">${element[8]}</span></div>`
    });
    primi.innerHTML += `<fieldset style="width : 25%; float : left">${content}<legend>Primitiva</legend></fieldset>`;
})

fetch(APY+'pepapig/euromillones')
.then(res=>res.json())
.then((data)=>{
    content = ''
    for (let i = 0; i < data.length-1; i++) {
        content += `<div><span style="font-size: bold">${data[i][0]}</div>`
        content += `<div>${data[i][1]}-${data[i][2]}-${data[i][3]}-${data[i][4]}-${data[i][5]}::${data[i][6]}-${data[i][7]}</div>`
        content += `<div><span style="color: red; font-size: bold">${data[i][8]}</span></div>`
    };
    content += `<div><span style="color: blue; font-size: bold">${data[data.length-1]}</span></div>`
    euro.innerHTML += `<fieldset style="width : 25%; float: left;"><legend>Euromillones</legend>${content}</fieldset>`;
})