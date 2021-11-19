const divcontent= document.querySelector('#content')
const items = ['Primitiva', 'Euromillones']

items.forEach((item)=>{
    const onecard = document.createElement('ui-card');
    onecard.setAttribute('id', item.toLowerCase());

    const title = document.createElement('strong');
    title.setAttribute('slot', 'title');
    title.innerHTML=item.toString();

    onecard.appendChild(title)
    divcontent.appendChild(onecard);
});

const primi = document.querySelector('#primitiva')
const euro = document.querySelector('#euromillones')

let content ='';

fetch(`${API}pepapig/primitiva?key=${KEY}`)
.then(res=>res.json())
.then((data)=>{
    const div = document.createElement('div');
    data.forEach((item)=>{
        let content = `<div><strong>${item[0]}</strong><br>`;
        content += `${item[1]},${item[2]},${item[3]},${item[4]},${item[5]},${item[6]} - ${item[7]} <strong>(${item[8]}) </strong></div>`
        div.innerHTML += content;
    });
    primi.setContent(div);
})

fetch(`${API}pepapig/euromillones?key=${KEY}`)
.then(res=>res.json())
.then((data)=>{
    const div = document.createElement('div');
    data.forEach((item, index)=>{
        let content = `<div><strong>${item[0]}</strong><br>`;
        if (index >=9){
            content += `<strong>${item[1]}: </strong> ${item[2]},${item[3]}<br>`;
            content += `<strong>${item[4]}: </strong> ${item[5]},${item[6]}</div>`
        }else{
            content += `${item[1]},${item[2]},${item[3]},${item[4]},${item[5]},${item[6]} - ${item[7]} <strong>(${item[8]}) </strong></div>`
        }
        div.innerHTML += content;
    });
    euro.setContent(div);
})