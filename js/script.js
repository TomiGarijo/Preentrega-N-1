function tres_cuotas (x) {
    return x/3;
}

function seis_cuotas (x) {
    return x/6;
}

function nueve_cuotas (x) {
    return x/9;
}

function doce_cuotas (x) {
    return x/12;
}

function dieciocho_cuotas (x) {
    return x/18;
}

function veinticuatro_cuotas (x) {
    return x/24;
}

let exit=false;

while (!exit) {
    alert("Calculadora de Cuotas");
    let num=parseInt(prompt("Ingrese el presupuesto: "));
    alert("¿Cuotas con o sin intereses? 0=Sin interes - Otro valor=Con interes");
    let interes=parseInt(prompt("Ingrese la cantidad de intereses: "));
    let opcion=parseInt(prompt("Ingrese la cantidad de cuotas: "+"3"+", "+"6"+", "+"9"+", "+"12"+", "+"18"+" o "+"24"+" cuotas"));
    let valor=0;
    
    if (interes==0) {
        switch (opcion) {
            case 3:
                valor=tres_cuotas(num);
                break;
            case 6:
                valor=seis_cuotas(num);
                break;
            case 9:
                valor=nueve_cuotas(num);
                break;
            case 12:
                valor=doce_cuotas(num);
                break;
            case 18:
                valor=dieciocho_cuotas(num);
                break;
            case 24:
                valor=veinticuatro_cuotas(num);
                break;
            default:
                alert("Solo 3, 6, 9, 12, 18 y 24 cuotas")
                break;
        }
    } else {
        switch (opcion) {
            case 3:
                valor=tres_cuotas(num)+tres_cuotas(num)*interes/100;
                break;
            case 6:
                valor=seis_cuotas(num)+seis_cuotas(num)*interes/100;
                break;
            case 9:
                valor=nueve_cuotas(num)+nueve_cuotas(num)*interes/100;
                break;
            case 12:
                valor=doce_cuotas(num)+doce_cuotas(num)*interes/100;
                break;
            case 18:
                valor=dieciocho_cuotas(num)+dieciocho_cuotas(num)*interes/100;
                break;
            case 24:
                valor=veinticuatro_cuotas(num)+veinticuatro_cuotas(num)*interes/100;
                break;
            default:
                alert("Solo 3, 6, 9, 12, 18 y 24 cuotas")
                break;
        }
    }
    
    if (interes==0) {
        alert("Son"+" "+opcion+" "+"cuotas de: "+valor+" "+"pesos");
    } else {
        alert("Son"+" "+opcion+" "+"cuotas de: "+valor+" "+"pesos"+" con "+interes+"% "+" de "+" interes");
    }
}