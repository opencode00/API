document.onkeyup = enter;

function enter(ev){
    // console.log(ev.keyCode);
    if (ev.keyCode == 13) login();
}

function login(){
    const username=document.querySelector('#username');
    const password=document.querySelector('#password');
    if (username.value == '' || password.value == ''){
        getError();
        return 
    }
    
    console.log(`${APY}/login`)
    fetch(`${APY}/login`,{
        method: "POST",
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: `user=${username.value}&pass=${password.value}`,
    })
    .then(res=> {
        console.log(res)
        if(res.status == 200){
            return res.text()
        }else
            getError();
            return null
    })
    .then((data)=>{
        if (data != null){
            // sessionStorage.setItem('key',data);
            document.cookie = `key=${data}`;
            window.location.href = `${window.location.href}?key=${data}`;
        }
    });
}

function getError(){
    er = document.querySelector('#error');
    er.innerHTML = "Error de autenticación";
}