// Cosas que puedo agregar
// Boton de finalizar compra.
// Descuento por cantidad.
// Formas de pago.


class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1
    }
}

const argentina = new Producto(1, "Argentina", 11000, "./img/argentina.png");
const brasil = new Producto(2, "Brasil", 10000, "./img/brasil.png");
const chile = new Producto(3, "Chile", 8000, "./img/chile.png");
const colombia = new Producto(4, "Colombia", 12000, "./img/colombia.png");
const descafeinado = new Producto(5, "Descafeinado", 8000, "./img/descafeinado.png");
const fuerte = new Producto(6, "Fuerte", 10000, "./img/fuerte.png");
const guatemala = new Producto(7, "Guatemala", 12000, "./img/guatemala.png");
const india = new Producto(8, "India", 9000, "./img/india.png");
const peru = new Producto(9, "Peru", 8000, "./img/peru.png");
const suave = new Producto(10, "Suave", 7000, "./img/suave.png");

const productos = [argentina, brasil, chile, colombia, descafeinado, fuerte, guatemala, india, peru, suave];

let carrito = [];


if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

// Productos en stock.

const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card">
                    <img src = "${producto.img}" class = "card-img-tom imgProductos" alt = "${producto.nombre}">
                    <div class = "card-body">
                    <h2 class = "tituloCard">${producto.nombre}</h2>
                    <p class = "parrafoCard">$${producto.precio}</p>
                    <button class = "btn colorBoton" id = "boton${producto.id}">Agregar al carrito</button>
                    </div>
                    </div>`

        contenedorProductos.appendChild(card);

        // Agregar producto al carrito
        
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }

    calcularTotal();
    actualizarItems();

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

// Mostrar el carrito de compras

const verCarrito = document.getElementById("verCarrito");
const carritoFlotante = document.getElementById("carritoFlotante");
const cerrarCarritoFlotante = document.getElementById("cerrarCarritoFlotante");

verCarrito.addEventListener("click", () => {
    carritoFlotante.style.display = "block";
});

cerrarCarritoFlotante.addEventListener("click", () => {
    carritoFlotante.style.display = "none";
});

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("cardCarrito");
        card.innerHTML = `
            <div class = "card">
                <img src ="${producto.img}" class = "card-img-tom imgProductosCarrito alt = "${producto.nombre}>
                <div class = "card-body">
                    <h6 class = "tituloCarrito">${producto.nombre}</h2>
                    <p class = "parrafoCarrito">$${producto.precio}</p>
                    <p class = "cantidadCarrito">${producto.cantidad}</p>
                    <button class="btn colorBoton botonCarrito" id="agregarboton${producto.id}"><span class="botonCarritoSpan">+</span></button>
                    <button class="btn colorBoton botonCarrito" id="eliminarboton${producto.id}"><span class="botonCarritoSpan">-</span></button>
                    </div>
                    </div>`

        contenedorCarrito.appendChild(card);

        // Agregar producto al carrito

        const botonAgregar = document.getElementById(`agregarboton${producto.id}`);
        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            mostrarCarrito();
        })

        // Eliminar producto del carrito

        const botonEliminar = document.getElementById(`eliminarboton${producto.id}`);
        botonEliminar.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
            mostrarCarrito();
        })
    })
}

// Funcion eliminarDelCarrito

const eliminarDelCarrito = (id) => {
    const producto = carrito.find (producto => producto.id === id);
    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        const indice = carrito.indexOf(producto);
        carrito.splice(indice, 1); 
    }
    mostrarCarrito();
    calcularTotal();
    actualizarItems();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Funcion para vaciar el carrito de compras.

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    vaciarTodoElCarrito();
})

const vaciarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    calcularTotal();

    localStorage.clear();
}

const total = document.getElementById("total");

const calcularTotal= () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad
    })
    total.innerHTML = `$${totalCompra}`
}

const carritoItems = document.getElementById("carritoItems");

// Función para actualizar el indicador
const actualizarItems = () => {
    // Calcula la cantidad total de productos en el carrito (puedes personalizar esto)
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    
    carritoItems.textContent = ` (${cantidadTotal})`;
};

actualizarItems();
