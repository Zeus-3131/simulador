// Funciones esenciales de la calculadora
function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

function multiplicacion(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

// Función para manejar el evento de clic en el botón "Calcular"
function calcular() {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);
    let operacion = document.getElementById("operacion").value;

    let resultado;
    switch (operacion) {
        case '+':
            resultado = suma(numero1, numero2);
            break;
        case '-':
            resultado = resta(numero1, numero2);
            break;
        case '*':
            resultado = multiplicacion(numero1, numero2);
            break;
        case '/':
            resultado = division(numero1, numero2);
            break;
        default:
            resultado = "Operación no válida";
    }

    document.getElementById("resultado").innerHTML = "Resultado: " + resultado;

    // Guardar historial en el almacenamiento local
    guardarEnHistorial({ operacion: operacion, numero1: numero1, numero2: numero2, resultado: resultado });
}

// Función para guardar un cálculo en el historial
function guardarEnHistorial(calculation) {
    let historial = localStorage.getItem('historial');

    if (!historial) {
        historial = [];
    } else {
        historial = JSON.parse(historial);
    }

    historial.push(calculation);
    localStorage.setItem('historial', JSON.stringify(historial));

    // Mostrar el historial actualizado
    mostrarHistorial();
}

// Función para mostrar el historial en la página
function mostrarHistorial() {
    let historial = localStorage.getItem('historial');
    const listaHistorial = document.getElementById('listaHistorial');

    if (!historial) {
        listaHistorial.innerHTML = "<li>No hay operaciones guardadas</li>";
        return;
    }

    historial = JSON.parse(historial);

    if (historial.length === 0) {
        listaHistorial.innerHTML = "<li>No hay operaciones guardadas</li>";
        return;
    }

    listaHistorial.innerHTML = historial.map(op => {
        return `<li>${op.numero1} ${op.operacion} ${op.numero2} = ${op.resultado}</li>`;
    }).join('');
}

// Función para limpiar el historial al cargar la página
window.onload = function() {
    limpiarHistorial();
    mostrarHistorial(); // Mostrar historial actualizado
}

// Función para limpiar el historial
function limpiarHistorial() {
    localStorage.removeItem('historial');
}

// Asignar la función calcular al evento de clic en el botón "Calcular"
const calcularBtn = document.getElementById("calcularBtn");
calcularBtn.addEventListener('click', calcular);


// Asignando el boton o click de la alerta 
let boton = document.getElementById("boton");

boton.addEventListener("click", () => {
    Swal.fire({
        title: "Está seguro de salir?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, seguro",
        cancelButtonText: "No, no quiero",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Cerrando Sesión",
                icon: "success"
            }).then(() => {
                window.location.href = "../../index.html";
            });
        }
    });
});

   
    