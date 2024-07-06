// Gerer la page loggin

const formLogin = document.querySelector(`.loginpage`);

const connexion = function (e) {
    e.preventDefault()
    const inputEmail = document.querySelector(`input[name="email"]`)
    const inputPassword = document.querySelector(`input[name="password"]`)
    const requestInfo = {
        email: inputEmail.value,
        password : inputPassword.value,
    };
    const body = JSON.stringify(requestInfo);
    fetch("http://localhost:5678/api/users/login",{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body: body, 
    }).then(res => res.json())
    .then((res)=>{
        if(res.userId){
            localStorage.setItem("token", res.token)
            window.location.href="index.html"
        }else{
            const invalidLogin = document.getElementById("invalid-login");
            invalidLogin.style.display = "block";
        }
    })
}

formLogin.addEventListener('submit', connexion);