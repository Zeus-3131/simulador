const mostrarConversionesBtn = document.getElementById("mostrarConversionesBtn");
const conversionesDiv = document.getElementById("conversiones");
const filtroInput = document.getElementById("filtro");

mostrarConversionesBtn.addEventListener("click", function() {
    if (conversionesDiv.style.display === "none") {
        // Mostrar el div si está oculto
        conversionesDiv.style.display = "block";
        cargarDatosConversionMoneda();
    } else {
        // Ocultar el div si está visible
        conversionesDiv.style.display = "none";
    }
});

function cargarDatosConversionMoneda() {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            mostrarConversiones(data);
        })
        .catch(error => {
            console.error('Error al cargar datos de conversión:', error);
        });
}

function mostrarConversiones(data) {
    conversionesDiv.innerHTML = ''; // Limpiar contenido previo
    if (data && data.rates) {
        Object.keys(data.rates).forEach(currency => {
            conversionesDiv.innerHTML += `<p>${currency}: ${data.rates[currency]}</p>`;
        });
    }

    // Agregar evento para filtrar al escribir en el campo de búsqueda
    filtroInput.addEventListener("input", function() {
        const filtro = filtroInput.value.toLowerCase();
        const conversiones = conversionesDiv.querySelectorAll("p");

        conversiones.forEach(conversion => {
            const texto = conversion.textContent.toLowerCase();
            if (texto.includes(filtro)) {
                conversion.style.display = "block";
            } else {
                conversion.style.display = "none";
            }
        });
    });
}


// Función para realizar la conversión de moneda
function convertirMoneda() {
    let monto = parseFloat(document.getElementById("monto").value);
    let moneda = document.getElementById("moneda").value.toLocaleUpperCase();

    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        .then(response => response.json())
        .then(data => {
            let tipoCambio = data.rates[moneda];
            let resultado = monto * tipoCambio;

            document.getElementById("resultadoConversion").innerHTML = `Resultado: ${resultado.toFixed(2)} ${moneda}`;
        })
        .catch(error => {
            console.error('Error al realizar la conversión:', error);
        });
}

// Asignar la función convertirMoneda al evento de clic en el botón "Convertir"
const convertirBtn = document.getElementById("convertirBtn");
convertirBtn.addEventListener('click', convertirMoneda);


// Asignar el boton para la alerta de cerrar sesión
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

