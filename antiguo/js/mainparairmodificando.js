function obtenerSoloNumeros() {
    let cantidad = NaN;
    while (isNaN(cantidad)) {
        cantidad = Number(prompt('¿Cuántos metros quieres comprar?'));
        if (isNaN(cantidad)) {
            alert('Por favor, ingresa un número válido para la cantidad.');
        }
    }
    return cantidad;
}

function obtenerTipoDeCompra() {
    return prompt('Venta de pino, cedro y roble en liston y tablas ¿En qué formato te gustaría comprar?').toLowerCase();
}

function verificarTipoDeCompra() {
    let tipoDeCompra = obtenerTipoDeCompra();

    while (tipoDeCompra !== 'liston' && tipoDeCompra !== 'tablas') {
        alert('No es una opción correcta la ingresada. Vuelve a ingresar por favor');
        tipoDeCompra = obtenerTipoDeCompra();
    }

    return tipoDeCompra;
}

function comprarMaderas() {
    const tipoDeCompra = verificarTipoDeCompra();

    if (tipoDeCompra === 'liston') {
        comprarListones();
    } else if (tipoDeCompra === 'tablas') {
        comprarTablas();
    }
}

const aplicarDescuento = (subtotalTotal) => {
    const descuentoA = 0.90;
    const descuentoB = 0.75;

    if (subtotalTotal >= 150000) {
        return subtotalTotal * descuentoB;
    } else if (subtotalTotal >= 100000) {
        return subtotalTotal * descuentoA;
    } else {
        return subtotalTotal;
    }
}

const mostrarDetalleDeCompra = (precioFinal) => {
    alert('El precio final de su compra es: $' + precioFinal)
}


alert('Bienvenidos a la Maderix');

// Esta parte de los listones lo agregue para poder seguir con el mismo proyecto y agregar lo que se pedia para esta preentrega, pero me complico mas y creo que haciendo lo que hice al final iba a cumplir igual. Pero bueno me sirvió para practicar.

function comprarListones() {

    // esta función la saque practicando en freeCodeCamp
    function buscarPropiedad(liston, precio) {
        for (let i = 0; i < listones.length; i++) {
            if (listones[i].tipo === liston && listones[i].hasOwnProperty(precio)) {
                return listones[i][precio];
            }
        }
        return "Algo de lo que ingresaste no es correcto";
    }    

    let listonTipo = '';
    let cantidad = 0;
    const listones = [
        {tipo: 'pino', precio: 1500,},
        {tipo: 'cedro', precio: 2000,},
        {tipo: 'roble', precio: 2500,},
    ];
    let subtotalListones = 0;
    let precio = 0;
    let seguirComprandoListones = true;

    do {
        listonTipo = prompt('Venta de pino, cedro y roble ¿Qué liston te gustaría comprar?').toLowerCase();
        
        if (listonTipo === 'pino' || listonTipo === 'cedro' || listonTipo === 'roble') {
            cantidad = obtenerSoloNumeros();
            precio = buscarPropiedad(listonTipo, 'precio');
            
            if (precio !== "Algo de lo que ingresaste no es correcto") {
                let subtotalCompra = precio * cantidad;
                subtotalListones += subtotalCompra;
            alert('Has comprado ' + cantidad + ' metros de ' + listonTipo + '. El subtotal es: $ '+ subtotalListones);
        } else {
        alert(precio);
        }
    } seguirComprandoListones = confirm('¿Quiere seguir agregando algun liston más?');
} while (seguirComprandoListones);
return subtotalListones;
}

function comprarTablas() {
    let tablas = '';
    let cantidad = 0;
    let precio = 0;
    let subtotalTablas = 0;
    let seguirComprandoTablas = true;

    do {
        tablas = prompt('Venta de pino, cedro y roble ¿Qué tabla te gustaria comprar?').toLowerCase();
        cantidad = obtenerSoloNumeros();

        switch (tablas) {
            case 'pino':
                precio = 5000;
                alert ('El precio del pino por metro es: $'+precio);
                break;
            
            case 'cedro':
                precio = 7000;
                alert ('El precio del cedro por metro es: $'+precio);
                break;
            
            case 'roble':
                precio = 10000;
                alert ('El precio del roble por metro es: $'+precio);
                break;

            default:
                alert('Algo de lo que ingresaste no es correcto')
                precio = 0;
                cantidad = 0;
        }
    let subtotalCompra = precio * cantidad;
    subtotalTablas += subtotalCompra;
    seguirComprandoTablas = confirm('¿Quiere seguir agregando alguna tabla más?')

} while (seguirComprandoTablas);

return subtotalTablas;
}

const subtotales = {
    listones: [],
    tablas: [],
};

function seguirComprandoMaderas() {
    let seguirComprando = true;

    while (seguirComprando) {
        const tipoDeCompra = verificarTipoDeCompra();

        if (tipoDeCompra === 'liston') {
            const subtotalListones = comprarListones();
            subtotales.listones.push(subtotalListones);
            mostrarDetalleDeCompra(subtotalListones);
        } else if (tipoDeCompra === 'tablas') {
            const subtotalTablas = comprarTablas();
            subtotales.tablas.push(subtotalTablas);
            mostrarDetalleDeCompra(subtotalTablas);
        }

        seguirComprando = confirm('¿Quiere seguir agregando algo más?');
    }
}

seguirComprandoMaderas();

const subtotalListonesTotal = subtotales.listones.reduce((acc, val) => acc + val, 0);
const subtotalTablasTotal = subtotales.tablas.reduce((acc, val) => acc + val, 0);
const subtotalTotal = subtotalListonesTotal + subtotalTablasTotal;

const precioFinal = aplicarDescuento(subtotalTotal);

mostrarDetalleDeCompra(precioFinal);