import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector("[data-formulario]");
const botonLimpiar = document.querySelector("[data-limpiar]");

// Contenedor para los mensajes de notificación
const toastContainer = document.createElement("div");
toastContainer.style.position = "fixed";
toastContainer.style.top = "20px";
toastContainer.style.right = "20px";
toastContainer.style.zIndex = "1000";
document.body.appendChild(toastContainer);

async function crearProducto(evento) {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    // Validación previa de campos vacíos
    if (!nombre || !precio || !imagen || !descripcion) {
        mostrarToast("Por favor, completa todos los campos.", "error");
        return;
    }

    // Desactivar el botón de envío mientras se procesa
    evento.submitter.disabled = true;

    try {
        await conexionAPI.enviarProducto(nombre, imagen, precio, descripcion);
        mostrarToast("Producto cargado con éxito.", "exito");
        formulario.reset(); // Limpiar el formulario después de un envío exitoso
    } catch (error) {
        console.error("Error al enviar el producto:", error);
        if (!error.response) {
            mostrarToast("Problema de conexión. Verifica tu red.", "error");
        } else if (error.response.status === 500) {
            mostrarToast("Error en el servidor. Inténtalo más tarde.", "error");
        } else {
            mostrarToast("Hubo un problema al enviar el producto. Inténtalo de nuevo.", "error");
        }
    } finally {
        // Reactivar el botón de envío después del proceso
        evento.submitter.disabled = false;
    }
}

// Función para mostrar notificaciones (toasts)
function mostrarToast(mensaje, tipo) {
    const toast = document.createElement("div");
    toast.textContent = mensaje;
    toast.style.padding = "10px";
    toast.style.marginTop = "10px";
    toast.style.color = tipo === "exito" ? "green" : "red";
    toast.style.backgroundColor = tipo === "exito" ? "#d4edda" : "#f8d7da";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0px 2px 6px rgba(0, 0, 0, 0.2)";

    toastContainer.appendChild(toast);

    // Elimina el toast después de 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Evento de envío del formulario
formulario.addEventListener("submit", crearProducto);

// Evento para limpiar el formulario con confirmación
botonLimpiar.addEventListener("click", (evento) => {
    evento.preventDefault(); // Evita el comportamiento por defecto del botón de limpiar

    const confirmarLimpiar = confirm("¿Estás seguro de que deseas limpiar el formulario?");
    if (confirmarLimpiar) {
        formulario.reset(); // Limpia todos los campos del formulario
        mostrarToast("Formulario limpiado.", "exito");
    }
});
