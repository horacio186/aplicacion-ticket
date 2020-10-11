// Comando para establecer la conexión
var socket = io();

// referencia a cada uno de los elementos de la pagina publico.html
// nro del ticket
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');
// escritorio
var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');


var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

// visualizar el ticket actual (data=UltimoTicket y Ultimos4)
socket.on('estadoActual', function(data) {
    // console.log(data);
    actualizaHTML(data.ultimos4);
});

// actualizar en pantalla publico.html cuando se atiende un nuevo nro desde cualquier pantalla
socket.on('ultimos4', function(data) {
    //console.log(data);
    // generar un sonido cuando cambien el nro
    var audio = new Audio('audio/new-ticket.mp3');
    audio.muted = true;
    audio.play();
    audio.muted = false;

    actualizaHTML(data.ultimos4);
});

// función que recibe los ultimos 4
function actualizaHTML(ultimos4) {

    for (var i = 0; i <= ultimos4.length - 1; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero); // concateno el nro
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio); //concateno el escritorio
    }

}