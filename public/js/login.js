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
    
    fetch(`${API}login`,{
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `user=${username.value}&pass=${password.value}`,
    })
    .then(res=> {
        if (res.status == 200) return res.text();
        return res.status;
    })
    .then(data => {
        if(data != 403){
            sessionStorage.setItem('key',data);
            window.location.href = `${API}?key=${data}`;
        }else
            getError();
    });
}

function getError(){
    er = document.querySelector('#error');
    er.innerHTML = "Error de autenticación";
}
