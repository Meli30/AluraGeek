import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]")

function crearCard(id,titulo,descripcion,imagen,precio){
    const producto = document.createElement("div");
    producto.className="card";

    producto.innerHTML=`
            
            <h1>${titulo}</h1>
            <img src="${imagen}" class="card-img" alt="${titulo}">
            <div class="card-body">
                <p class="card-text">${descripcion}</p>
                <div class="card-value">
                    <p>${precio}</p>
                    <i class="fa-sharp fa-solid fa-trash-can" style="color: #0a0a0a; cursor: pointer;" data-id="${id}"></i>
                </div>
            </div>
        
`;

// Evento de clic para eliminar el producto
const eliminarIcono = producto.querySelector(`[data-id="${id}"]`);
if (eliminarIcono) {
    eliminarIcono.addEventListener("click", async () => {
        try {
            await conexionAPI.eliminarProducto(id); // Llamar a la función DELETE
            producto.remove(); // Eliminar la card del DOM
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert("Hubo un problema al eliminar el producto.");
        }
    });
}

return producto;
}

async function listarProductos() {
    const listaAPI = await conexionAPI.listarProductos();

    listaAPI.forEach(producto => {
      lista.appendChild(
        crearCard(
          producto.id,
          producto.titulo,
          producto.descripcion,
          producto.imagen,
          producto.precio
        )
      );
    
});

}

listarProductos();