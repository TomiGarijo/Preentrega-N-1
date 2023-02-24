//Defino Variables y Carrito de productos (array) vacio.
let carrito=[];
let bool=true;
let total=0;

//Metodo de busqueda de array y agregar productos al carrito vacio con arrow function.
function agregarAlCarrito(producto) {
    carrito.push(listaDeProductos.find((el)=> el.nombre===producto))
    console.log (carrito)
} 

//Metodo de quitar elementos del carrito (.find busca el producto, si es true el .indexof devuelve un valor distinto a -1. El .splice elimina el objeto tomando como posicion el valor devuelto por el .indexOf).
function eliminarDelCarrito(producto) {
    let index=carrito.indexOf(carrito.find((el)=>el.nombre===producto))
    if (index!=-1) {
        carrito.splice(index,1)
    }
    console.log(carrito)
}

//Funcion que permite sumar el precio total del carrito final.
function precioTotal() {
    for (const el of carrito) {
        total+=el.precio
    }
}

//Armo lista de productos con array y objetos
const listaDeProductos = [
    { id: 1, nombre: "manzana", precio: 50, tipo: "frutas"},
    { id: 2, nombre: "banana", precio: 110, tipo: "frutas"},
    { id: 3, nombre: "naranja", precio: 30, tipo: "frutas"},
    { id: 4, nombre: "mandarina", precio: 60, tipo: "frutas"},
    { id: 5, nombre: "lechuga", precio: 200, tipo: "verduras"},
    { id: 6, nombre: "tomate", precio: 50, tipo: "verduras"},
    { id: 7, nombre: "apio", precio: 70, tipo: "verduras"},
    { id: 8, nombre: "albaca", precio: 65, tipo: "verduras"},
    { id: 9, nombre: "anana", precio: 335, tipo: "frutas"},
    { id: 10, nombre: "cebolla", precio: 15, tipo: "verduras"},
    { id: 11, nombre: "papa", precio: 10, tipo: "verduras"},
    { id: 12, nombre: "batata", precio: 25, tipo: "verduras"},
    { id: 13, nombre: "melon", precio: 350, tipo: "frutas"},
    { id: 14, nombre: "sandia", precio: 545, tipo: "frutas"},
    { id: 15, nombre: "kiwi", precio: 95, tipo: "frutas"},
    { id: 16, nombre: "zapallo", precio: 90, tipo: "verduras"},
];

//Comienzo de interaccion con el usuario.
alert("BIENVENIDO A VERDULERIA CODERHOUSE (Tenemos verduras y frutas)");

//Ciclos while con booleano de salida que permite agregar objetos al carrito.
while(bool) {
    agregarAlCarrito(producto=prompt("¿Que producto necesita agregar al carrito?").toLocaleLowerCase());
    if (prompt("¿Quiere agregar otro producto? (SI o NO)").toUpperCase()=="SI") {
        bool=true;
    } else {
        bool=false;
    }
}

//Permite eliminar objetos del carrito. Reseteo valor bool a true.
if (opcion=prompt("¿Quiere eliminar productos? (SI o NO)").toUpperCase()=="SI") {
    bool=true;
    while(bool) {
        eliminarDelCarrito(prompt`Elimine el producto: ${producto.toLocaleLowerCase()}`)
        if (prompt("¿Quiere eliminar otro producto? (SI o NO)").toUpperCase()==="SI") {
            bool=true;
        } else {
            bool=false;
            precioTotal();
            alert(`El precio total es: ${total} pesos`);
            alert("Gracias por comprar en VERDULERIA CODERHOUSE - Su pedido llega en 48hs");
        }
    }
} else {
    precioTotal();
    alert(`El precio total es: ${total} pesos`);
    alert("Gracias por comprar en VERDULERIA CODERHOUSE - Su pedido llega en 48hs");
}