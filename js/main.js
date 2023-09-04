alert('Bienvenidos a la Maderix');

const comprarMaderas = () => {
    let madera = '';
    let cantidad = 0;
    let precio = 0;
    let subtotal= 0;
    let seguirComprando = true;

    do {
        madera = prompt('Venta de pino, cedro y roble ¿Qué madera te gustaria comprar?').toLowerCase();
        cantidad = Number(prompt('¿Cuantos metros queres comprar?'));

        console.log(madera);
        console.log(cantidad);

        switch (madera) {
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

        subtotal += precio * cantidad;

        seguirComprando = confirm('¿Quiere seguir agregando alguna madera más?')

    } while (seguirComprando);

    return subtotal;
}

const aplicarDescuento = (subtotal) => {
    const descuentoA = 0.90;
    const descuentoB = 0.75;

    if (subtotal >= 50000) {
        return subtotal * descuentoB;
    } else if (subtotal >= 30000) {
        return subtotal * descuentoA;
    } else {
        return subtotal;
    }
}

const mostrarDetalleDeCompra = (precioFinal) => {
    alert('El precio final de su compra es: $'+precioFinal)
}
    
const subtotal = comprarMaderas();

const precioFinal = aplicarDescuento(subtotal);

mostrarDetalleDeCompra(precioFinal);