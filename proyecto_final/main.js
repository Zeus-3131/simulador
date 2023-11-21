// Función para alternar el modo oscuro y claro
// function alternarModo() {
//     const body = document.body;
//     body.classList.toggle("dark-mode");
// }

// // Asignar la función alternarModo al evento de clic en el botón "Modo Oscuro"
// const darkModeBtn = document.getElementById("darkModeBtn");
// darkModeBtn.addEventListener('click', alternarModo);

const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

loginBtn.addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verificación básica del usuario y contraseña
    if (username === "admin" && password === "1234") {
    window.location.href = "paginas/calculadora/calculadora.html";

    } else {
        loginMessage.textContent = "Usuario o contraseña incorrectos";
        alert(loginMessage.textContent )
    }
    
    alert("Bienvenido/a");
    // Swal.fire({
    //     icon: "success",
    //     title: "Bienvenido",                                                no pude configurar la alerta de la libreria yo creo que es por boostrap
    //     showConfirmButton: false,
    //     timer: 1500
    //   }).then(() => {
    //     window.location.href = "paginas/calculadora/calculadora.html";
    // });
});