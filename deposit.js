/* const form = document.getElementById ("formDeposito")
    form.addEventListener("submit", function (event){
    event.preventDefault();

    let monto = document.getElementById ("montoDeposito").value;
    monto = Number(monto);

    if (monto<=0){
        alert("Ingresar un monto superior a 0");
        return;
    }

    let saldoActual = localStorage.getItem("saldo");
    saldoActual = Number(saldoActual);

    let nuevoSaldo = saldoActual + monto;

    localStorage.setItem ("saldo", nuevoSaldo);

    // guardar movimiento

    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
        movimientos.push("Depósito: $" + monto);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    alert("Deposito realizado exitosamente");


    window.location.href = "menu.html"
});
*/
/*
1 - Usuario escribe monto
2 - Hace click en Realizar depósito
3 - Se evita que el formulario recargue
4 - Se suma al saldo
5 - Se guarda en localStorage
6 - Se vuelve al menú
7 - El menú muestra el saldo nuevo
*/

$(document).ready(function () {

    // capturar  formulario
    $('#formDeposito').submit(function (event) {
        event.preventDefault();

        // leer monto
        let monto = Number($('#montoDeposito').val());

        if (monto <= 0) {
            alert("Ingresa un monto válido");
            return;
        }

        // obtener saldo actual
        let saldo = Number(localStorage.getItem("saldo")) || 0;

        // calcular nuevo saldo
        let nuevoSaldo = saldo + monto;
        localStorage.setItem("saldo", nuevoSaldo);

        // ===== GUARDAR MOVIMIENTO =====
        let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

        movimientos.push({
            tipo: "deposito",   // importante para el filtro
            monto: monto
        });

        localStorage.setItem("movimientos", JSON.stringify(movimientos));
        // ==============================

        // mensaje de exito
        $('#alert-container').html(`
            <div class="alert alert-success text-center">
                Depósito realizado: $${monto}
            </div>
        `);

        // redirigir luego de 2 segundos
        setTimeout(function () {
            window.location.href = "menu.html";
        }, 2000);
    });

});