const BASE_URL = "https://67426541e464749900907b96.mockapi.io/products";

// Obtener lista de productos
const productList = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al listar productos:", error);
        throw error; // Opcional: Propagar el error si es necesario.
    }
};

// Crear producto
const createProducts = async (name, price, image, descripcion) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price, image, descripcion }),
        });

        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);
        const data = await response.json();
        return data; // Devolver datos creados
    } catch (error) {
        console.error("Error al crear producto:", error);
        throw error;
    }
};

// Eliminar producto
const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}/${productId}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);
        console.log(`Producto con ID ${productId} eliminado con éxito.`);
        return true; // Indicar éxito
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        throw error;
    }
};

export const servicesProducts = {
    productList,
    createProducts,
    deleteProduct,
};
