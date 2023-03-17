//Creo array vacio
let carrito = [];

//Creo una clase donde ingresar los productos
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

//Funcion que permite agregar al carrito un nuevo producto mediante el ID.
function agregarAlCarrito(producto) {
    let existente = carrito.find(el => el.id === producto.id);
    if (existente) {
        existente.agregar();
    } else {
        let nuevoProducto = new Producto(producto);
        carrito.push(nuevoProducto);
    }
    localStorage.setItem('carritoEnStorage', JSON.stringify(carrito));
    actualizarCarrito();
}

//Funcion que permite eliminar un producto del array vacio "carrito"
function eliminarDelCarrito(producto) {
    let index = carrito.indexOf(carrito.find(el => el.id === producto.id));
    if (carrito[index].cantidad > 1) {
        carrito[index].quitar();
    } else if (carrito.length === 1) {
        vaciarCarrito();
    } else {
        carrito.splice(index, 1);
    }
    localStorage.setItem('carritoEnStorage', JSON.stringify(carrito));
    actualizarCarrito();
}

//Funcion que crear las cards de productos en HTML mediante JS.
function crearCardProductosHTML() {
    let contenedor = document.getElementById('main-container_id');
    contenedor.innerHTML = '';
    fetch('./js/data.json')
        .then((res) => res.json())
        .then(data => {
            data.forEach((producto) => {
                let card = document.createElement('div');
                card.innerHTML = `       
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top imagen-verduleria" src=${producto.img} alt="Card image cap" />
                        <div class="card-body">
                            <h3 class="card-title">${producto.nombre}</h3>
                            <p class="card-title">Tipo: ${producto.tipo}</p>
                            <p class="card-text">Precio: $${producto.precio}</p>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button id="agregar${producto.tipo}${producto.id}" type="button" class="btn btn-dark"> Agregar </button>
                            </div>
                        </div>
                    </div>`;
            contenedor.appendChild(card);
            let boton = document.getElementById(
            `agregar${producto.tipo}${producto.id}`
            );
            boton.addEventListener('click', () => agregarAlCarrito(producto)) 
            boton.addEventListener('click', () => {
                Toastify({
                    text: "Producto agregado al carrito",
                    duration: 2000,
                    gravity: "top",
                    position: "left",
                    style: {
                        background: "white",
                        color: "black",
                    }
            }).showToast();})  
         })  
    })   
}

//Funcion que actualiza la lista del carrito.
function actualizarCarrito() {
    let contenedor = document.getElementById('carrito-container');

    if (carrito.length === 0) {
        contenedor.innerHTML = '';
        return;
    }

    contenedor.innerHTML = `
            <table id="tabla-carrito" class="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
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
            <td><img src=${verduleria.img} alt="Card image cap" width="75px" height="75px" style="border-radius: 10px; border:1px solid black";/></td>
            <td>${verduleria.nombre}</td>
            <td>${verduleria.cantidad}</td>
            <td>${verduleria.precio}</td>
            <td>${verduleria.precio * verduleria.cantidad}</td>
            <td><button id="eliminar${
            verduleria.id
            }" class="btn btn-red">Eliminar</button></td>`;

        bodyTabla.appendChild(datos);

        let boton = document.getElementById(`eliminar${verduleria.id}`);
        boton.addEventListener('click', () => eliminarDelCarrito(verduleria));
        boton.addEventListener('click', () => {
            Toastify({
                text: "Producto eliminado del carrito",
                duration: 2000,
                gravity: "top",
                position: "left",
                style: {
                    background: "black",
                    color: "white",
                }
        }).showToast()})
    }

    let precioTotal = obtenerPrecioTotal(carrito);
    let accionesCarrito = document.getElementById('acciones-id');
    accionesCarrito.innerHTML = `
            <h5>Total: $${precioTotal}</h5></br>
            <button id="vaciarCarrito" onclick="" class="btn btn-dark">Vaciar Carrito</button>`;
    let botonVaciar = document.getElementById(`vaciarCarrito`);
    botonVaciar.addEventListener('click',() => {
        swal({
            title: "¿Quiere vaciar el carrito?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                vaciarCarrito();
                swal("Se vació el carrito correctamente!", {
                icon: "success",
              });
            } else {
                swal("Su carrito sigue en pie!");
            }
          });
    })
}


//Funcion que calcula el total del valor tomado en la variables precio.
function obtenerPrecioTotal(array) {
    return array.reduce(
    (total, elemento) => total + elemento.precio * elemento.cantidad,0
  );
}

//Funcion que vacia completamente ek carrito mediante un boton.
function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem('carritoEnStorage');
  document.getElementById('carrito-container').innerHTML = '';
  document.getElementById('acciones-id').innerHTML = '';
}

//Funcion que chequea si en el storage hay items almacenados, en caso que se encuentren se pushean en un nuevo array el cual aparece al recargar la pagina como carrito. 
function chequearCarritoEnStorage() {
  let array = [];
  let contenidoEnStorage = JSON.parse(localStorage.getItem('carritoEnStorage'));
  if (contenidoEnStorage) {
    for (const objeto of contenidoEnStorage) {
      let recuproducto = new Producto(objeto);
      array.push(recuproducto);
    }
  }
  return array;
}

//Ejecuto la funcion que crear los cards y la que chequea el storage.
document.addEventListener('DOMContentLoaded', function () {
  crearCardProductosHTML();
  carrito = chequearCarritoEnStorage();
  actualizarCarrito();
});