fetch('http://localhost:5001/pepapig/primitiva')
.then(res=>res.json())
.then((data)=>{
    const primi = document.querySelector('#primitiva')
    primi.innerHTML = data;
    console.log(data)
})
fetch('http://localhost:5001/pepapig/euromillones')
.then(res=>res.json())
.then((data)=>{
    const euro = document.querySelector('#euromillones')
    euro.innerHTML = data;
    console.log(data)
})