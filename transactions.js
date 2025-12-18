



$(document).ready(function () {

    // referencia a la lista
    const lista = $('#listaTransacciones');

    // leer movimientos desde localtorage
    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    // funcion para mostrar movimientos segun filtro
    function mostrarUltimosMovimientos(filtro) {

        // limpiar lista
        lista.empty();

        // si no hay movimientos
        if (movimientos.length === 0) {
            lista.append(`
                <li class="list-group-item text-center">
                    No hay movimientos registrados
                </li>
            `);
            return;
        }

        // recorrer movimientos
        movimientos.forEach(function (mov) {

            // aplicar filtro
            if (filtro !== "todos" && mov.tipo !== filtro) {
                return;
            }

            // texto legible segun tipo
            let textoTipo = getTipoTransaccion(mov.tipo);

            // crear item
            lista.append(`
                <li class="list-group-item">
                    ${textoTipo} - $${mov.monto}
                </li>
            `);
        });
    }

    // funcion para texto del tipo
    function getTipoTransaccion(tipo) {
        if (tipo === "deposito") return "Depósito";
        if (tipo === "envio") return "Transferencia enviada";
        if (tipo === "recibido") return "Transferencia recibida";
        return "Movimiento";
    }

    // mostrar todos al cargar
    mostrarUltimosMovimientos("todos");

    // evento del filtro
    $('#filtroTipo').change(function () {
        let filtro = $(this).val();
        mostrarUltimosMovimientos(filtro);
    });

});
