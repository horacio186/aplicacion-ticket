// CLASE QUE CONTROLA TODO
const fs = require('fs');

// ticket pendientes, no hace falta exportarla pq solo la ocuparemos en esta clase
class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}



class TicketControl {

    constructor() {

        this.ultimo = 0; // ultimo ticket
        this.hoy = new Date().getDate(); // indicar que dia es hoy
        this.tickets = []; // almacenar los ticket pendientes, todos
        this.ultimos4 = []; // ticket pendientes que se muestran por pantalla(4)

        // grabar un archivo texto o de BD para grabar y obtener nuestros datos
        // ante cualquuier problema
        let data = require('../data/data.json');

        // Para limpiar los datos cuando comienza un nuevo día
        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo; // nro ticket
            this.tickets = data.tickets; // ticket pendientes
            this.ultimos4 = data.ultimos4; // últimos 4 ticket pendientes


        } else {
            this.reiniciarConteo();
        }

    }

    // indicar el siguiente nro o ticket (pantalla nuevo-ticket.html)
    siguiente() {
        // incrementar en 1 el ultimo ticket
        this.ultimo += 1;

        // instanciar la clase ticket (parametro ticket, escritorio)
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket); // agregar al final del arreglo de ticket pendientes

        // grabar en el archivo de texto el ultimo nro
        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;

    }

    // Obtener el ultimo ticket para poder mostrarlo por pantalla(nuevo-ticket.html)
    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    // Obtener los ultimo 4 ticket para poder mostrarlo por pantalla(nuevo-ticket.html)
    getUltimos4() {
        return this.ultimos4;
    }

    // Atender los ticket pendientes, (pantalla publico.html)
    atenderTicket(escritorio) {

        // Validaciones
        if (this.tickets.length === 0) {
            return 'No hay mas boletos por atender';
        }

        // obtener el nro del primer ticket pendiente
        let numeroTicket = this.tickets[0].numero;
        // Borrar el primer elemento del arreglo de ticket pendientes
        this.tickets.shift();

        // declarar la instancia de un nuevo ticket, para atenderlo (publico.html)
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // Para agregarlo al INICIO DEL arreglo
        this.ultimos4.unshift(atenderTicket);

        // Si los ticket es mayor que 4 hay que ir borrando
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // borra el último
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    // Limpiar los datos cuando comienza un nuevo día
    reiniciarConteo() {

        this.ultimo = 0; // nro de ticket
        this.tickets = []; // ticket pendientes
        this.ultimos4 = []; // últimos 4 ticket pendientes

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }

    // grabar en el archivo de texto el siguiente nro y la fecha (nuevo-ticket.html)
    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4 // ticket de la pantalla de espera
        };
        // se tiene que enviar como un string
        let jsonDataString = JSON.stringify(jsonData);
        // ahora se tiene que grabar en el archivo de texto, se importa el require('fs')
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }



}



module.exports = {
    TicketControl
}