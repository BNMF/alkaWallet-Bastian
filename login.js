/*

capturar info del formulario
const form = document.getElementById("loginForm")


//Escuchar el submit
form.addEventListener("submit", function (event){
event.preventDefault();

//leer la informacion de los id con el .value
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
//definir las credenciales de ingreso
const emailValido = "correo@gmail.com";
const passwordValida = "123123";

const mensaje = document.getElementById("mensaje");

if (email === emailValido && password === passwordValida) {
    mensaje.textContent = "Ingresando...";
    window.location.href = "menu.html";



} else {
    mensaje.textContent = "credenciales incorrectas";
}

});


*/
//====================
//NUEVO CODIGO JQUERY
//====================


$(document).ready(function () {


    //escuchar el submit del formulario con jquery
    $('#loginForm').submit(function(event){
    event.preventDefault();

    //obtener valores con jquery
    const email = $('#email').val();
    const password = $('#password').val();

    // credenciales validas
    const emailValido = "correo@gmail.com";
    const passwordValida = "123123";

    // elemento mensaje con jquery
    const mensaje = $('#mensaje');

    if (email === emailValido && password === passwordValida) {
    mensaje.html 
        (`<div class="container alert alert-success mt-3" role= "alert">
        Ingresando.. 
        </div`);

        setTimeout(function () {
        window.location.href = "menu.html";
        }, 800);
    
    } else {
    mensaje.html(`
    <div class="container alert alert-danger mt-3" role="alert">
    Credenciales incorrectas
    </div>`);
    }

})

})