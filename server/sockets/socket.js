const { io } = require('../server');
// IMPORTAR la clase
const { TicketControl } = require('../classes/ticket-control');

// declarar una nueva instancia del TicketControl para poder utilizarla y 
// disparar el cosntructor de esa clase
const ticketControl = new TicketControl();



io.on('connection', (client) => {
    // llamado desde el boton de la pag. socket.nuevo-ticket.js (pantalla nuevo-ticket.html)
    client.on('siguienteTicket', (data, callback) => {
        // llama a la clase siguiente
        let siguiente = ticketControl.siguiente();

        console.log(siguiente);
        // indica el siguiente nro en el label
        callback(siguiente);
    });

    // Del lado del servidor emitir un evento llamado 'estadoActual' (pantalla nuevo-ticket.html y publico)
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(), // ultimo ticket 
        ultimos4: ticketControl.getUltimos4() // ultimos 4
    });

    // escuchar el siguiente evento sobre atender ticket pendientes(4) - (pantalla publico.html)
    // se envia la DATA que puede ser el escritorio u otra cosa que quiero enviar
    // callback, notificar cuando se haga el proceso o indicar cual es el ticket para el escritorio
    client.on('atenderTicket', (data, callback) => {
        // validar que venga el valor del escritorio en el URL
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        // hay que llamar a la función de ticket-control.js (atenderTicket) y 
        // me regresa el nro atenderTicket
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        // retornar el ticket para qeu se pueda trabajar en el front end
        callback(atenderTicket);

        // actualizar/ notificar cambios en los ULTIMOS 4 (publico.html) para todas las pantallas
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });


    });




});