// Versión con uso de Storage
class Verduleria {
    constructor(verduleria) {
        this.id = verduleria.id;
        this.marca = verduleria.marca;
        this.precio = verduleria.precio;
        this.cantidad = verduleria.cantidad;
        this.precioTotal = verduleria.precio;
    }
    agregarUnidad() {
        this.cantidad++;
    }
    quitarUnidad() {
        this.cantidad--;
    }
    actualizarPrecioTotal() {
        this.precioTotal = this.precio*this.cantidad;
    }
}

// ************** DECLARACIÓN DE FUNCIONES ************** //

function imprimirProductosEnHTML(array) {
    // Obtenemos el div que contendrá nuestras cards
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    // Recorremos el array y por cada item imprimimos una card
    for (const verduleria of array) {
        // Creamos el contendor individual para cada card
        let card = document.createElement("div");
        // <div>
        //     <img>
        //     <h1>
        //</div>

        // Agregamos el contenido a la card
        // Observar cómo el nombre del id del botón se genera
        // de manera dinámica
        card.innerHTML = `
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <img src="${verduleria.img}" id="" class="card-img-top img-fluid" alt="">
                <h2 class="card-title">${verduleria.marca}</h2>
                <h5 class="card-subtitle mb-2 text-muted">${verduleria.descripcion}</h5>
                <p class="card-text">$${verduleria.precio}</p>

                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${verduleria.tipo}${verduleria.id}" type="button" class="btn btn-dark"> Agregar </button>
                </div>
            </div>
        </div>      
        `;

        // Una vez que tenemos creada la card, la agregamos al contenedor
        // que obtuvimos desde el HTML
        contenedor.appendChild(card);

        // Luego de agregar la card al DOM,
        // asignamos el evento al botón correspondiente, habiendo nombrado su id de manera
        // dinámica
        let boton = document.getElementById(`agregar${alfajor.marca}${alfajor.id}`);
        boton.addEventListener("click", () => agregarAlCarrito(alfajor));
    }
}

function agregarAlCarrito(producto) {
    // Verificamos si ese tipo de alfajor ya se encuentra en el array
    // con el método find()
    // Este método en caso de dar true, nos devuelve el primer elemento del array
    // que cumple con la condición de búsqueda
    let index = carrito.findIndex((elemento) => elemento.id === producto.id);
    console.log({ index });

    if (index != -1) {
        // Si el alfajor se encuentra en el carrito, alfajorEnCarrito devolverá
        // true, por lo cual se ejecutará este bloque de código
        // y se le sumará uno a la cantidad de esa marca en el carrito

        // Una vez que obtenemos el index donde se halla el elemento ya agregado
        // al carrito, invocamos a los métodos que actualizaran unidades y precio total
        // De unidades repetidas
        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        // El alfajor no se encuentra en el carrito, así que
        // lo pusheamos al array asignándole la clase Alfajor
        // para poder acceder a sus métodos

        // En esta instancia, tenemos que inicializar la propiedad cantidad en 1
        let alfajor = new Alfajor(producto);
        alfajor.cantidad = 1;
        carrito.push(alfajor);
    }

    // Actualizamos el storage y el contenido de la tabla
    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarDelCarrito(id) {
    // Aquí buscamos el índice del producto en el carrito a eliminar
    let index = carrito.findIndex((element) => element.id === id);

    // Primero chequeamos el stock para saber si hay que restarle 1
    // al stock o quitar el elemento del array
    if (carrito[index].cantidad > 1) {
        // Si hay más de una unidad de ese producto, invocamos los métodos correspondientes
        carrito[index].quitarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        // Si queda solo una unidad, se elimina del array
        // Para esto utilizamos el método splice
        // Este método sobreescribe el array original
        // Con alfajor id indicamos el índice del elemento en el array
        // a eliminar. El 1 es la cantidad de elementos a eliminar, como en este caso

        // [3, 2, 1, 5, 4, 2].splice(2, 2)
        carrito.splice(index, 1);
    }

    //swal("Producto eliminado con éxito", "", "success");

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarCarrito() {
    carrito = [];
    localStorage.removeItem("carritoEnStorage");
    // localStorage.clear()
    swal("Compra eliminada con éxito", "", "success");

    document.getElementById("tabla-carrito").innerHTML = "";
    document.getElementById("acciones-carrito").innerHTML = "";
}

function obtenerPrecioTotal(array) {
    return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

// Recibe el contenido del carrito y lo imprime en el html
// en una tabla
function imprimirTabla(array) {
    let contenedor = document.getElementById("tabla-carrito");
    contenedor.innerHTML = "";

    // Creamos el div que contendrá la tabla
    let tabla = document.createElement("div");

    // A ese div le agregaremos todos los datos de la tabla
    tabla.innerHTML = `
        <table id="tablaCarrito" class="table table-striped">
            <thead>         
                <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">

            </tbody>
        </table>
    `;

    contenedor.appendChild(tabla);

    // Una vez que dibujamos la tabla, obtenemos el id del body de la tabla
    // donde imprimiremos los datos del array
    let bodyTabla = document.getElementById("bodyTabla");

    for (let alfajor of array) {
        let datos = document.createElement("tr");
        datos.innerHTML = `
                <td>${alfajor.marca}</td>
                <td>${alfajor.cantidad}</td>
                <td>$${alfajor.precioTotal}</td>
                <td><button id="eliminar${alfajor.id}" class="btn btn-dark">Eliminar</button></td>
      `;

        bodyTabla.appendChild(datos);

        let botonEliminar = document.getElementById(`eliminar${alfajor.id}`);
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(alfajor.id));
    }

    let precioTotal = obtenerPrecioTotal(array);
    let accionesCarrito = document.getElementById("acciones-carrito");
    accionesCarrito.innerHTML = `
		<h5>PrecioTotal: $${precioTotal}</h5></br>
		<button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark">Vaciar Carrito</button>
	`;
}

function filtrarBusqueda(e) {
    e.preventDefault();

    // Tomo el value del input y le agrego toLowerCase para que la búsqueda no sea
    // case sensitive
    let ingreso = document.getElementById("busqueda").value.toLowerCase();
    let arrayFiltrado = alfajores.filter((elemento) => elemento.marca.toLowerCase().includes(ingreso));

    imprimirProductosEnHTML(arrayFiltrado);
}

function chequearCarritoEnStorage() {
    let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));

    // Si existe la key buscada en el storage nos traemos
    // los datos para recuperarlos y poder visualizarlos en pantalla
    if (contenidoEnStorage) {
        // Al traer los datos del storage perdemos las instancias de clase
        // Para recuperarlas genero una copia del array con la info del storage
        // instanciando la clase en cada objeto del array
        let array = [];

        for (const objeto of contenidoEnStorage) {
            // Recibo los datos del objeto del storage
            // los guardo en la variable alfajor con la instancia de clase
            // let alfajor = new Alfajor(objeto, objeto.cantidad);
            let alfajor = new Alfajor(objeto);
            alfajor.actualizarPrecioTotal();
            // Envio ese objeto instanciado al arrray
            array.push(alfajor);
        }

        imprimirTabla(array);

        // Una vez que terminamos, la función retorna ese nuevo array con los datos recuperados
        return array;
    }

    // Si no existe ese array en el LS, esta función devolverá un array vacío
    return [];
}

// ************** EVENTO **************
let btnFiltrar = document.getElementById("btnFiltrar");
btnFiltrar.addEventListener("click", filtrarBusqueda);

// ************** CONSTANTES Y VARIABLES **************
const listaVerduleria = [
    { id: 1, nombre: "manzana", precio: 50, tipo: "frutas", img:"../media/manzana.jpg"},
    { id: 2, nombre: "banana", precio: 110, tipo: "frutas", img:"../media/banana.jpg" },
    { id: 3, nombre: "naranja", precio: 30, tipo: "frutas", img:"../media/naranja.jpg"},
    { id: 4, nombre: "mandarina", precio: 60, tipo: "frutas", img:"../media/mandarina.jpg"},
    { id: 5, nombre: "lechuga", precio: 200, tipo: "verduras", img:"../media/"},
    { id: 6, nombre: "tomate", precio: 50, tipo: "verduras", img:"../media/"},
    { id: 7, nombre: "apio", precio: 70, tipo: "verduras", img:"../media/"},
    { id: 8, nombre: "albahaca", precio: 65, tipo: "verduras", img:"../media/"},
    { id: 9, nombre: "anana", precio: 335, tipo: "frutas", img:"../media/"},
    { id: 10, nombre: "cebolla", precio: 15, tipo: "verduras", img:"../media/"},
    { id: 11, nombre: "papa", precio: 10, tipo: "verduras", img:"../media/"},
    { id: 12, nombre: "batata", precio: 25, tipo: "verduras", img:"../media/"},
    { id: 13, nombre: "melon", precio: 350, tipo: "frutas", img:"../media/"},
    { id: 14, nombre: "sandia", precio: 545, tipo: "frutas", img:"../media/"},
    { id: 15, nombre: "kiwi", precio: 95, tipo: "frutas", img:"../media/"},
    { id: 16, nombre: "zapallo", precio: 90, tipo: "verduras", img:"../media/"},
];

// Ejecución del código
// --- Invocación de funciones ---
imprimirProductosEnHTML(alfajores);

// Consulta al Storage para saber si hay información almacenada
// Si hay datos, se imprimen en el HTML al refrescar la página
let carrito = chequearCarritoEnStorage();