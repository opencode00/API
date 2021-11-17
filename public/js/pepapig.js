const divcontent= document.querySelector('#content')
const items = ['Primitiva', 'Euromillones']

items.forEach((item)=>{
    const onecard = document.createElement('ui-card');
    onecard.setAttribute('id', item.toLowerCase());

    const title = document.createElement('strong');
    title.setAttribute('slot', 'title');
    title.innerHTML=item.toString();

    // const body = document.createElement('div');
    // body.setAttribute('id', `content_${item.toLowerCase()}`)
    // title.setAttribute('slot', 'content');
    // title.innerHTML=item.toString();

    onecard.appendChild(title)
    // onecard.appendChild(body)
    divcontent.appendChild(onecard);
});

const primi = document.querySelector('#primitiva')
const euro = document.querySelector('#euromillones')

let content ='';

fetch(`${API}pepapig/primitiva?key=${KEY}`)
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

// fetch(`${API}+'pepapig/euromillones?key=${KEY}`)
// .then(res=>res.json())
// .then((data)=>{
//     content = ''
//     for (let i = 0; i < data.length-1; i++) {
//         content += `<div><span style="font-size: bold">${data[i][0]}</div>`
//         content += `<div>${data[i][1]}-${data[i][2]}-${data[i][3]}-${data[i][4]}-${data[i][5]}::${data[i][6]}-${data[i][7]}</div>`
//         content += `<div><span style="color: red; font-size: bold">${data[i][8]}</span></div>`
//     };
//     content += `<div><span style="color: blue; font-size: bold">${data[data.length-1]}</span></div>`
//     euro.innerHTML += `<fieldset style="width : 25%; float: left;"><legend>Euromillones</legend>${content}</fieldset>`;
// })