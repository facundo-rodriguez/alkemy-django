

//https://docs.djangoproject.com/en/5.0/topics/db/sql/

//https://developer.mozilla.org/es/docs/Learn/Forms/Form_validation


let proveedores;

let buttonModal=document.querySelector("button[data-bs-target='#modalProducto']")
buttonModal.addEventListener("click", listarProveedores);

let select=document.querySelector("select[name='proveedor']");

let alerta=document.querySelector(".alert-success")
alerta.style.display="none";

listarProductos();
// productos("http://127.0.0.1:8000/compra/productos/lista/")
// //console.log("a: "+ a )
// .then(data => {
//     console.log(data); // JSON data parsed by `data.json()` call
//   });

async function datos(url, params){

    try{
        const response = await fetch(url,params);

        if (!response.ok) throw new Error("lanzo excepcion "+ response.statusText , response.status);

        const data = await response.json();
        return data;

    }catch(error){
        console.log("catch: "+ error);    
    }
}



async function listarProductos(){ 

    const listaProductos= await datos("http://127.0.0.1:8000/compra/productos/lista/");
    
    const listaProveedores= await datos("http://127.0.0.1:8000/compra/proveedores/listaProveedores/");  

    proveedores=listaProveedores;

    console.log( proveedores)

    console.log(listaProductos);
    
    tbodyProductos.innerHTML="";


    listaProductos.forEach(producto =>{

        let tr=document.createElement("tr");

        let td_idProducto=document.createElement("td");
        let td_nombre=document.createElement("td");
        let td_precio=document.createElement("td");
        let td_stock=document.createElement("td");
        let td_idProveedor=document.createElement("td");
        let td_proveedor=document.createElement("td");
        let td_fechaAlta=document.createElement("td");

        td_idProducto.innerHTML=producto.id_producto;
        td_nombre.innerHTML=producto.nombre;
        td_precio.innerHTML=producto["precio"];
        td_stock.innerHTML=producto["stock"];
        td_idProveedor.innerHTML=producto["id_proveedor"];
        td_proveedor.innerHTML=producto["proveedor"];
        td_fechaAlta.innerHTML=producto["fecha_alta"];

        tr.appendChild(td_idProducto)
        tr.appendChild(td_nombre)
        tr.appendChild(td_precio)
        tr.appendChild(td_stock)
       // tr.appendChild(td_idProveedor);
        tr.appendChild(td_proveedor);
        tr.appendChild(td_fechaAlta);

        tbodyProductos.appendChild(tr);

    });

}

function listarProveedores(){

    let select=document.querySelector("select[name='proveedor']");

    select.innerHTML = "";

    proveedores.forEach(proveedor =>{
        
        let option=document.createElement("option");
        option.value=proveedor.dni;

        option.textContent=proveedor.nombre + " " + proveedor.apellido;

        select.appendChild(option);
    })

}


function formulario(){
    
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    let nombre=document.querySelector("input[name='nombre']").value;
    let precio=document.querySelector("input[name='precio']").value;
    let stock=document.querySelector("input[name='stock']").value;
    let id_proveedor=document.querySelector("#selectProveedor");
    
    let value_id_proveedor = id_proveedor.options[id_proveedor.selectedIndex].value;
    
    let postData={
        "nombre":nombre,
        "precio":precio,
        "stock":stock,
        "id_proveedor":value_id_proveedor
    }


    let params={
                  method: 'POST',
                  headers:{
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                        },
                  body: JSON.stringify(postData)
                };

    return params; 
}



async function crearProducto(){

    let params = formulario();

    const response=await datos("http://127.0.0.1:8000/compra/productos/agregar/", params);

    if(response.success){

        alerta.style.display="block";
        listarProductos();
    }

}



// Ejemplo implementando el metodo POST:
// async function postData(url = '', data = {}) {
// // Opciones por defecto estan marcadas con un *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }
