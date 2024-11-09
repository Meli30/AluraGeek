async function listarProductos(){
    const conexion = await fetch("http://localhost:3001/productos");

    const conexionConvertida =await conexion.json();

    //console.log(conexionConvertida);

    return conexionConvertida
}

async function enviarProducto(titulo,imagen,precio,descripcion) {
    const conexion = await fetch("http://localhost:3001/productos",{
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
    await fetch(`http://localhost:3001/productos-gato/${id}`, {
        method: "DELETE",
    });

}

export const conexionAPI = {
    listarProductos,
    enviarProducto,
    eliminarProducto
};