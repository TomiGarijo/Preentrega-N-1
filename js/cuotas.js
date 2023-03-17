/*function calcular_cuotas (monto, cuotas) {
    return monto/cuotas;
}

let exit=false;

while (!exit) {
    alert("Calculadora de Cuotas");
    let num=parseInt(prompt("Ingrese el presupuesto: "));
    alert("¿Cuotas con o sin intereses? 0=Sin interes - Otro valor=Con interes");
    let interes=parseInt(prompt("Ingrese la cantidad de intereses: "));
    let opcion = obtenerCuotas();
    let valor=0;
    
    switch (opcion) {
        case 3:
            valor=calcular_cuotas(num, 3);
            break;
        case 6:
            valor=calcular_cuotas(num, 6);
            break;
        case 9:
            valor=calcular_cuotas(num, 9);
            break;
        case 12:
            valor=calcular_cuotas(num, 12);
            break;
        case 18:
            valor=calcular_cuotas(num, 18);
            break;
        case 24:
            valor=calcular_cuotas(num, 24);
            break;
        default:
            alert("Solo 3, 6, 9, 12, 18 y 24 cuotas")
            break;
    }

    if (interes) {
        valor = valor * (1 + (interes / 100))
    }

    alert(`Son ${opcion} cuotas de: ${valor} pesos${interes ? ` con ${interes}% de interes` : ""}`);
}

function obtenerCuotas() {
    let opcion=parseInt(prompt("Ingrese la cantidad de cuotas: "+"3"+", "+"6"+", "+"9"+", "+"12"+", "+"18"+" o "+"24"+" cuotas"));

    if (opcion==3 || opcion==6 || opcion==9 || opcion==12 || opcion==18 || opcion==24) {
        return opcion;
    }

    alert("Valor de cuotas ingresado no válido");

    obtenerCuotas();
}*/