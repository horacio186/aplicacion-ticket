// Comando para establecer la conexión
var socket = io();

// obtener todos los parametros desde la URL
var searchParams = new URLSearchParams(window.location.search);
// para preguntar si no existe la variable escritorio en la URL
if (!searchParams.has('escritorio')) {
    // salir de la pantalla e ir a la principal
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

// Si viene el parametro escritorio en la URL
var escritorio = searchParams.get('escritorio');
// para hacer referencia a una etiqueta small de la pag. html (escritorio)
var label = $('small');

// agregar el nro de escritorio en la etiqueta escritorio en <h1> en la (pag. escritorio.html)
console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

// Evento del botón (atender siguiente ticket) misma página
// cambiar el small y mostrar el ticket que me devuelve el servicio o servidor
$('button').on('click', function() {
    // llamar al socket
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay mas boletos por atender') { // es la misma respuesta por error en atendetTicket
            label.text(resp); // mensaje indicando que ya no hay ticket
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.numero);

    });

});