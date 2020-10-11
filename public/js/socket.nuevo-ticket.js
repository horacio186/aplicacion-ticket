// Comando para establecer la conexión
var socket = io();
// referenciar el label en este caso mensaje cargando
var label = $('#lblNuevoTicket');

// Conectar al usuario al servidor
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// cliente se desconecta de la sesion
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// on 'estadoActual', para escuchar cuando se emita el valor de 'estadoActual'
socket.on('estadoActual', function(resp) {

    console.log(resp);
    label.text(resp.actual); // asi se llama desde el client.emit(socket.js)
    // console.log('Estado actual ', resp.actual);
    //console.log('label ', $('#lblNuevoTicket').text());
    //$('#lblNuevoTicket').text(resp.actual);

});

// hacer click en el botón, incrementa el nro de ticket y muestra el nro en el label
$('button').on('click', function() {

    // mostrar ticket en el label, si no se refleja es pq deben definir el callback en el servidor
    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });
    //console.log('click');
});