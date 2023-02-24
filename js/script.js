let carrito = [];

//Creo un array donde ingresar los productos
class Producto {
  constructor(producto) {
    this.id = producto.id;
    this.nombre = producto.nombre;
    this.tipo = producto.tipo;
    this.precio = producto.precio;
    this.img = producto.img;
    this.cantidad = producto.cantidad ?? 1;
  }

  agregar() {
    this.cantidad++;
  }

  quitar() {
    this.cantidad--;
  }
}

// Declaro funciones a utilizar
function agregarAlCarrito(producto) {
  let existente = carrito.find(el => el.id === producto.id);
  if (existente) {
    existente.agregar();
  } else {
    let nuevoProducto = new Producto(producto);
    carrito.push(nuevoProducto);
  }

  localStorage.setItem("carritoEnStorage", JSON.stringify(carrito))
  actualizarCarrito();
}

function eliminarDelCarrito(producto) {
  let index = carrito.indexOf(carrito.find(el => el.id === producto.id));
  if (carrito[index].cantidad > 1) {
    carrito[index].quitar();
  } else {
    carrito.splice(index, 1);
  }
  
  localStorage.setItem("carritoEnStorage", JSON.stringify(carrito))
  actualizarCarrito();
}

function crearCardProductosHTML(array) {
  let contenedor = document.getElementById('main-container_id');
  contenedor.innerHTML = '';

  for (const producto of array) {
    let card = document.createElement('div');
    card.innerHTML = `       
        <div class="card" style="width: 18rem;">
            <img class="card-img-top imagen-verduleria" src=${producto.img} alt="Card image cap" />
            <div class="card-body">
                <h3 class="card-title">${producto.nombre}</h3>
                <h5 class="card-title">${producto.tipo}</h5>
                <p class="card-text">$${producto.precio}</p>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${producto.tipo}${producto.id}" type="button" class="btn btn-dark"> Agregar </button>
                </div>
            </div>
        </div>`;
    contenedor.appendChild(card);
    let boton = document.getElementById(
      `agregar${producto.tipo}${producto.id}`
    );
    boton.addEventListener('click', () => agregarAlCarrito(producto));
  }
}

function actualizarCarrito() {
    let contenedor = document.getElementById('carrito-container');
    
    if (carrito.length === 0) {
        contenedor.innerHTML = "";
        return;
    }

    contenedor.innerHTML = `
        <table id="tabla-carrito" class="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Precio Total</th>
                    <th>Accion</th>
                </tr>

                <tbody id="bodyTabla">

                </tbody>
            </thead>
        </table>`;

    let bodyTabla = document.getElementById('bodyTabla');
    for (const verduleria of carrito) {
    let datos = document.createElement('tr');
    datos.innerHTML = `
        <td>${verduleria.nombre}</td>
        <td>${verduleria.cantidad}</td>
        <td>${verduleria.precio}</td>
        <td>${verduleria.precio * verduleria.cantidad}</td>
        <td><button id="eliminar${
            verduleria.id
        }" class="btn btn-red">Eliminar</button></td>
        `;

    bodyTabla.appendChild(datos);

    let boton = document.getElementById(`eliminar${verduleria.id}`);
    boton.addEventListener('click', () => eliminarDelCarrito(verduleria));
    }

    let precioTotal = obtenerPrecioTotal(carrito);
    let accionesCarrito = document.getElementById("acciones-id");
    accionesCarrito.innerHTML = `
        <h5>PrecioTotal: $${precioTotal}</h5></br>
        <button id="vaciarCarrito" onclick="vaciarCarrito()" class="btn btn-dark">Vaciar Carrito</button>`
}

function chequearCarritoEnStorage() {
    let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));
    if (contenidoEnStorage) {
        let array = [];
        for (const objeto of contenidoEnStorage) {
            let recuproducto = new Producto(objeto);
            array.push(recuproducto);
        }
        actualizarCarrito();
        return array;
    }
}

function obtenerPrecioTotal (array) {
    return array.reduce((total, elemento) => total + elemento.precio * elemento.cantidad, 0);
}

function vaciarCarrito () {
    carrito = [];
    localStorage.removeItem("carritoEnStorage");
    document.getElementById("carrito-container").innerHTML="";
    document.getElementById("acciones-id").innerHTML="";
}

//Carrito de productos
const listaVerduleria = [
    { id: 1, nombre: "manzana", precio: 50, tipo: "frutas", img:"./media/manzana.jpg"},
    { id: 2, nombre: "banana", precio: 110, tipo: "frutas", img:"./media/banana.jpg" },
    { id: 3, nombre: "naranja", precio: 30, tipo: "frutas", img:"./media/naranja.jpg"},
    { id: 4, nombre: "mandarina", precio: 60, tipo: "frutas", img:"./media/mandarina.jpg"},
    { id: 5, nombre: "lechuga", precio: 200, tipo: "verduras", img:"./media/lechuga.jpg"},
    { id: 6, nombre: "tomate", precio: 50, tipo: "verduras", img:"./media/tomate.jpg"},
    { id: 7, nombre: "apio", precio: 70, tipo: "verduras", img:"./media/apio.jpg"},
    { id: 8, nombre: "albahaca", precio: 65, tipo: "verduras", img:"./media/albahaca.jpg"},
    { id: 9, nombre: "anana", precio: 335, tipo: "frutas", img:"./media/anana.jpg"},
    { id: 10, nombre: "cebolla", precio: 15, tipo: "verduras", img:"./media/cebolla.jpg"},
    { id: 11, nombre: "papa", precio: 10, tipo: "verduras", img:"./media/papa.jpg"},
    { id: 12, nombre: "batata", precio: 25, tipo: "verduras", img:"./media/batata.jpg"},
    { id: 13, nombre: "melon", precio: 350, tipo: "frutas", img:"./media/melon.jpg"},
    { id: 14, nombre: "sandia", precio: 545, tipo: "frutas", img:"./media/sandia.jpg"},
    { id: 15, nombre: "kiwi", precio: 95, tipo: "frutas", img:"./media/kiwi.jpg"},
    { id: 16, nombre: "zapallo", precio: 90, tipo: "verduras", img:"./media/zapallo.jpg"},
];

//Ejecuto la funcion que imprime las cards en el HTML
document.addEventListener('DOMContentLoaded', function () {
  crearCardProductosHTML(listaVerduleria);
});

carrito = chequearCarritoEnStorage();