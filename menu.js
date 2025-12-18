/*/ capturamos elementos por id y lo ponemos en un const

const btnDepositar = document.getElementById ("btnDepositar");
const btnEnviar = document.getElementById ("btnEnviar");
const btnMovimientos = document.getElementById ("btnMovimientos");
const mensaje = document.getElementById ("mensaje");


//obtener saldo guardado o usar el inicial

let saldo = localStorage.getItem ("saldo");

if (saldo === null) {
    saldo = 60000
    localStorage.setItem ("saldo", saldo);
}

//mostrar saldo
document.getElementById ("saldo").textContent = "$" + saldo;

//funcion generica de redireccion
function redirigir(texto,url){
    mensaje.textContent = `redirigiendo a ${texto}...`;
    setTimeout (function (){
        window.location.href = url
    }, 1000);
}

//eventos 

btnDepositar.addEventListener("click",function() {
    redirigir("depositar", "deposit.html");
});

btnEnviar.addEventListener("click",function() {
    redirigir("Enviar Dinero", "sendmoney.html");
});

btnMovimientos.addEventListener("click",function() {
    redirigir("Ultimos Movimientos", "transactions.html");
});

*/


$(document).ready(function () {

    // MOSTRAR SALDO ACTUAL
    let saldo = localStorage.getItem("saldo");

    if (saldo === null) {
        saldo = 0;
        localStorage.setItem("saldo", saldo);
    }

    $('#saldo').text("$" + saldo);

    const mensaje = $('#mensaje');

    $('#btnDepositar').click(function () {
    mensaje.html(`
        <div class="alert alert-info">
        Redirigiendo a depósitos...
        </div>
    `);

    setTimeout(function () {
        window.location.href = "deposit.html";
        }, 800);
    });

    $('#btnEnviar').click(function () {
    mensaje.html(`
    <div class="alert alert-info">
    Redirigiendo a enviar dinero...
    </div>
    `);

    setTimeout(function () {
    window.location.href = "sendmoney.html";
    }, 800);
    });

    $('#btnMovimientos').click(function () {
    mensaje.html(`
    <div class="alert alert-info">
        Redirigiendo a últimos movimientos...
    </div>
    `);

    setTimeout(function () {
        window.location.href = "transactions.html";
        }, 800);
    });

});