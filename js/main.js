const productosJson = "./js/productos.json"
const productos = [];
let cantidadEnCarrito = 0;

fetch(productosJson)
  .then((response) => {
    if (!response.ok) {
      throw new Error("No se pudo obtener el archivo JSON.");
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((producto) => {
      productos.push(producto);
    });

    mostrarProductos();
  })
  .catch((error) => {
    console.error("Error: " + error.message);
  });

let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }
  
if (localStorage.getItem("cantidadEnCarrito")) {
    cantidadEnCarrito = parseInt(localStorage.getItem("cantidadEnCarrito"), 10);
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

    cantidadEnCarrito++;
    actualizarCantidadEnCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("cantidadEnCarrito", cantidadEnCarrito);

    mostrarNotificacion();

    mostrarCarrito();
}

const mostrarNotificacion = (mensaje) => {
    Toastify({
      text: "Producto agregado al carrito",
      duration: 1500,
      gravity: "bottom",
      position: "left",
      backgroundColor: "green",
      stopOnFocus: true,
    }).showToast();
  };

// Mostrar el carrito de compras

const carritoModal = document.getElementById("carritoModal");
const cerrarCarritoModal = document.getElementById("cerrarCarritoModal");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    carritoModal.style.display = "block";
    mostrarCarrito();
});

cerrarCarritoModal.addEventListener("click", () => {
    carritoModal.style.display = "none";
});

const mostrarCarrito = () => {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("cardCarrito");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-tom imgProductosCarrito" alt="${producto.nombre}">
                <div class="card-body">
                    <h6 class="tituloCarrito">${producto.nombre}</h6>
                    <p class="parrafoCarrito">$${producto.precio}</p>
                    <p class="cantidadCarrito">${producto.cantidad}</p>
                    <button class="btn colorBoton botonCarrito" id="agregarboton${producto.id}"><span class="botonCarritoSpan">+</span></button>
                    <button class="btn colorBoton botonCarrito" id="eliminarboton${producto.id}"><span class="botonCarritoSpan">-</span></button>
                </div>
            </div>`;

        contenedorCarrito.appendChild(card);

        // Agregar producto al carrito
        const botonAgregar = document.getElementById(`agregarboton${producto.id}`);
        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            mostrarCarrito();
        });

        // Eliminar producto del carrito
        const botonEliminar = document.getElementById(`eliminarboton${producto.id}`);
        botonEliminar.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
            mostrarCarrito();
        });
    });
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

    cantidadEnCarrito--;
    actualizarCantidadEnCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("cantidadEnCarrito", cantidadEnCarrito);
}

// Funcion para vaciar el carrito de compras.

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esto vaciará todo tu carrito de compras.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, vaciar carrito',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarTodoElCarrito();
      Swal.fire('Carrito vaciado', 'Tu carrito ha sido vaciado.', 'success');
    }
  });
});

const vaciarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    calcularTotal();
    cantidadEnCarrito = 0;
    actualizarCantidadEnCarrito();

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

const actualizarCantidadEnCarrito = () => {
    verCarrito.textContent = `Ver Carrito (${cantidadEnCarrito})`;
};

actualizarCantidadEnCarrito();


const finalizarCompraButton = document.getElementById("finalizarCompra");

finalizarCompraButton.addEventListener("click", () => {
  if (carrito.length === 0) {
    mostrarSweetAlert("¡Error!", "Tu carrito está vacío. Agrega productos antes de finalizar la compra.", "error");
  } else {
    Swal.fire({
      title: 'Finalizar compra',
      text: '¿Deseas finalizar la compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, finalizar compra',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        carritoModal.style.display = "none";
        finalizarCompraModal.style.display = "block";
      }
    });
  }
});

const cerrarFinalizarCompraModal = document.getElementById("cerrarFinalizarCompraModal");
const finalizarCompraModal = document.getElementById("finalizarCompraModal");

cerrarFinalizarCompraModal.addEventListener("click", () => {
    finalizarCompraModal.style.display = "none";
});

const confirmarCompra = document.getElementById("confirmarCompra");

confirmarCompra.addEventListener("click", () => {

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const direccion = document.getElementById("direccion").value;

    if (!nombre || !apellido || !direccion) {
        mostrarSweetAlert("¡Error!", "Por favor, completa todos los campos del formulario.", "error");
    } else {
        vaciarTodoElCarrito();
        finalizarCompraModal.style.display = "none";
    }
});

