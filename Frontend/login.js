// Gerer la page loggin

async function sendConnectInfo (){
    let formLogin = document.querySelector(`.loginpage`)
    let inputEmail = document.querySelector(`input[name="email"]`)
    let inputPassword = document.querySelector(`input[name="password"]`)
    formLogin.addEventListener(`submit`, function(event){
        event.preventDefault();
        // creation de la charge utile
        const connectInfo = {
            email: inputEmail.value,
            password: inputPassword.value,
        };
        // Transformation en JSON
        const chargeUtile = JSON.stringify(connectInfo);
        // Appel FETCH
        const response = await fetch("http://localhost:5678/api/users/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: chargeUtile,                                                              
        }).then(response => response.json())
})
}


sendConnectInfo()


