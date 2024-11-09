async function listarProductos(){
    const conexion = await fetch("https://my-json-server.typicode.com/Meli30/AluraGeek/productos");

    const conexionConvertida =await conexion.json();

    //console.log(conexionConvertida);

    return conexionConvertida
}


async function enviarProducto(titulo,imagen,precio,descripcion) {
    const conexion = await fetch("https://my-json-server.typicode.com/Meli30/AluraGeek/productos",{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            titulo:titulo,
            imagen:imagen,
            precio:precio,
            descripcion:descripcion
    })

    });

    const conexionConvertida= await conexion.json();

    return conexionConvertida;
}

//función DELETE
async function eliminarProducto(id) {
    await fetch(`https://my-json-server.typicode.com/Meli30/AluraGeek/productos/${id}`, {
        method: "DELETE",
    }); 
 
}

export const conexionAPI = {
    listarProductos,
    enviarProducto,
    eliminarProducto
};