$(document).ready(function () {

    // 
    // REFERENCIAS AL DOM
    // 
    const btnAgregarContacto = $('#btnAgregarContacto');
    const formEnvio = $('#formEnvio');
    const listaContactos = $('#contactos');
    const buscarContacto = $('#buscarContacto');

    const formContacto = $('#formContacto');
    const btnGuardarContacto = $('#btnGuardarContacto');
    const btnCancelarContacto = $('#btnCancelarContacto');

    const btnEnviar = $('button[type="submit"]');

    //ocultar formulario y boton enviar al inicio
    formContacto.hide();
    btnEnviar.hide();

    // 
    //MOSTRAR - OCULTAR FORMULARIO contacto
    // 
    btnAgregarContacto.click(function () {
        formContacto.slideDown();
    });

    btnCancelarContacto.click(function () {
        formContacto.slideUp();
    });

    // 
    //GUARDAR NUEVO CONTACTO
    // 
    btnGuardarContacto.click(function () {

        let nombre = $('#nombre').val();
        let rut = $('#rut').val();
        let alias = $('#alias').val();
        let banco = $('#banco').val();

        //validar campos vacios
        if (!nombre || !rut || !alias || !banco) {
            alert("Debes completar todos los campos");
            return;
        }

        //validacion basica rut
        if (!rut.includes("-")) {
            alert("El RUT debe tener guión (-)");
            return;
        }

        let partes = rut.split("-");
        let numero = partes[0];
        let digito = partes[1];

        if (isNaN(numero) || digito.length !== 1) {
            alert("RUT inválido");
            return;
        }

        // crear contacto en la lista
        const li = $(`
            <li class="list-group-item">
                <input type="radio" name="contacto" value="${alias}">
                ${alias} - ${nombre} - ${banco} (RUT: ${rut})
            </li>
        `);

        listaContactos.append(li);

        // limpiar formulario
        $('#nombre, #rut, #alias, #banco').val('');

        // ocultar formulario
        formContacto.slideUp();

        alert("Contacto agregado correctamente");
    });

    // 
    // BUSCAR CONTACTOS
    // 
    buscarContacto.on("keyup", function () {

        let texto = $(this).val().toLowerCase();

        $('#contactos li').each(function () {
            let contenido = $(this).text().toLowerCase();

            if (contenido.includes(texto)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // 
    // mostrar boton enviar al seleccionar
    // 
    $(document).on("change", 'input[name="contacto"]', function () {

        btnEnviar.show();

        $('#contactos li').removeClass('active');
        $(this).closest('li').addClass('active');
    });

    // 
    // ENVIAR DINERO
    // 
    formEnvio.submit(function (event) {
        event.preventDefault();

        let seleccionado = $('input[name="contacto"]:checked');

        if (seleccionado.length === 0) {
            alert("Debes seleccionar un contacto");
            return;
        }

        let saldo = Number(localStorage.getItem("saldo"));
        let monto = Number(
            prompt("Saldo disponible: $" + saldo + "\nIngrese monto a enviar:")
        );

        if (monto <= 0) {
            alert("Monto inválido");
            return;
        }

        if (monto > saldo) {
            alert("Saldo insuficiente");
            return;
        }

        // actualizar saldo
        let nuevoSaldo = saldo - monto;
        localStorage.setItem("saldo", nuevoSaldo);

        // 
        // GUARDAR MOVIMIENTO (envio)
        // 
        let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

        movimientos.push({
            tipo: "envio",     // tipo de transacción
            monto: monto       // monto enviado
        });

        localStorage.setItem("movimientos", JSON.stringify(movimientos));

        // mensaje de confirmación
    alert("Dinero enviado correctamente");


        // volver al menú
        window.location.href = "menu.html";
    });

});



///==================
//------ CODIGO antiguo
//====================

/*
//aqui se obtiene el boton agregar nuevo contacto
const btnAgregarContacto = document.getElementById("btnAgregarContacto");

//aqui se obtiene el formulario completo
const formEnvio = document.getElementById("formEnvio");


///--- -----------------
///agregar nuevo contacto
///----------------------

//este es un evento para escuchar el click en agregar contacto y lanza una funcion
btnAgregarContacto.addEventListener("click", function(){

//formulario emergente agregar contacto
let nombre = prompt("nombre y apellido:");
let rut = prompt("RUT:");
let alias = prompt("alias:");
let banco = prompt("nombre del banco:");

//validacion basica sin datos en blanco
if (nombre === "" || rut === "" || alias === "" || banco === ""){
    alert("debes completar todos los datos");
    return;
}

//validar RUT y formato 
//el siguiente if hace -- el if ejecuta el bloque de código solo si la variable rut no tiene un guion.

if (!rut.includes("-")){  
    alert("El RUT debe tener guion (-)");
    return;
}

//el let trozo que es igual al rut se separa por el " - " y en vez de ser texto es array
let trozo = rut.split("-"); // console.log(trozo); // ["12345678", "9"] 0 primera parte 1 segunda
let numero = trozo [0]
let digito = trozo [1]

if (isNaN(numero)){
    alert("Porfavor ingresa correctamente tu RUT");
    return;
}

if (digito.length !== 1) {
    alert("El digito verificador debe tener un solo caracter");
    return;
}


//mostrar contacto en la lista
const lista = document.getElementById("contactos");

const li = document.createElement("li")
li.className = "list-group-item";

li.innerHTML = 
'<input type= "radio" name= "contacto" value= "' + alias + '">' +
alias + " - " + nombre + " - " + banco + "(RUT: " + rut +")";

lista.appendChild(li);

alert("Contacto agregado correctamente");

});
///--------------
///enviar dinero
///--------------
//escucha submit de formEnvio y hace una funcion que es el evento
formEnvio.addEventListener("submit", function(event){
    event.preventDefault(); //evitamos que recargue pagina

//tomar los elementos del id contactos
    const lista = document.getElementById("contactos");


if (lista.children.length === 0){
    alert ("debes agregar al menos un contacto");
    return;
}

//el usuario marque al menos una opción (radio o checkbox) antes de continuar.

let seleccionado = document.querySelector('input[name="contacto"]:checked');


// Si no lo hace, se detiene y muestra un mensaje.
    if (!seleccionado) {
        alert("Debes seleccionar un contacto");
        return;
}

//leer saldo
let saldo = localStorage.getItem("saldo");
saldo = Number(saldo);

//ventana emergente para monto
let monto = prompt(
    "saldo disponible $:" + saldo + "\ingrese monto a enviar"
);

monto = Number(monto);
if (monto <=0) {
    alert("Monto Invalido");
    return;
}

if (monto > saldo) {
    alert("Saldo insuficiente");
    return;
}

//actualizar saldo
    let nuevoSaldo = saldo - monto;
    localStorage.setItem("saldo", nuevoSaldo);

// guardar movimiento
    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    movimientos.push(
    "Envío a " + seleccionado.value + ": $" + monto
);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

alert("Dinero enviado correctamente");

//volver al menu
window.location.href = "menu.html";

});

*/
