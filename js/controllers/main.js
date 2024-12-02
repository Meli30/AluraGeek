import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-lista]");
const form = document.querySelector("[data-formulario]");

function createCard({ id, name, price, image, descripcion }) {
    const formattedPrice = isNaN(price) ? "Precio no disponible" : `$${Number(price).toFixed(2)}`;

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <h1>${name}</h1>
        <img src="${image}" class="card-img" alt="Imagen de ${name}">
        <div class="card-body">
            <p class="card-text">${descripcion}</p>
            <div class="card-value">
                <p>${formattedPrice}</p>
                <i class="fa-sharp fa-solid fa-trash-can trash-icon" data-id="${id}"></i>
            </div>
        </div>
    `;

    card.querySelector(".trash-icon").addEventListener("click", async (event) => {
        const productId = event.target.dataset.id;
        try {
            await servicesProducts.deleteProduct(productId);
            card.remove();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    });

    return card;
}

const renderProducts = async () => {
    try {
        const listProducts = await servicesProducts.productList();

        if (listProducts.length === 0) {
            productContainer.innerHTML = "<p>No hay productos disponibles.</p>";
        } else {
            productContainer.innerHTML = ""; 
            listProducts.forEach((product) => {
                console.log("Producto procesado:", product);
                const productCard = createCard(product);
                console.log("Tarjeta creada:", productCard);
                productContainer.appendChild(productCard);
            });
        }
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        productContainer.innerHTML = "<p>Error al cargar los productos. Inténtalo de nuevo más tarde.</p>";
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value.trim();
    const price = parseFloat(document.querySelector("[data-price]").value);
    const image = document.querySelector("[data-image]").value.trim();
    const descripcion = document.querySelector("[data-descripcion]").value.trim();

    if (!name || !price || isNaN(price) || !image || !descripcion) {
        alert("Todos los campos son obligatorios y el precio debe ser un número válido.");
        return;
    }

    try {
        const newProduct = await servicesProducts.createProducts(name, price, image, descripcion);
        const newCard = createCard(newProduct);
        productContainer.appendChild(newCard);
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }

    form.reset();
});

renderProducts();



