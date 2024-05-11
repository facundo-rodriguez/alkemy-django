

//https://docs.djangoproject.com/en/5.0/topics/db/sql/

//https://developer.mozilla.org/es/docs/Learn/Forms/Form_validation


var proveedores;
listarProductos();

let buttonModal=document.querySelector("button[data-bs-target='#modalProducto']")
buttonModal.addEventListener("click", ()=>{ 
    let select=document.querySelector(" #selectProveedor"); // select[name='proveedorU']
    listarProveedores(select) 
});


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



//----------------------------------------
//----------------------------------------
//TABLA LISTA DE PRODUCTOS
async function listarProductos(){ 

    const listaProductos= await datos("http://127.0.0.1:8000/compra/productos/lista/");
    
    const listaProveedores= await datos("http://127.0.0.1:8000/compra/proveedores/listaProveedores/");  

    proveedores=listaProveedores;

    console.log( proveedores)

    console.log(listaProductos);
    
    tbodyProductos.innerHTML="";


    listaProductos.forEach((producto, indice) =>{

        let tr=document.createElement("tr");

        let td_idProducto=document.createElement("td");
        let td_nombre=document.createElement("td");
        let td_precio=document.createElement("td");
        let td_stock=document.createElement("td");
        let td_idProveedor=document.createElement("td");
        let td_proveedor=document.createElement("td");
        let td_fechaAlta=document.createElement("td");
        let td_editar=document.createElement("td");
        let td_eliminar=document.createElement("td");


        td_idProducto.innerHTML=producto.id_producto;
        td_nombre.innerHTML=producto.nombre;
        td_precio.innerHTML=producto["precio"];
        td_stock.innerHTML=producto["stock"];
        td_idProveedor.innerHTML=producto["id_proveedor"];
        td_proveedor.innerHTML=producto["proveedor"];
        td_fechaAlta.innerHTML=producto["fecha_alta"];

        let btn_editar=document.createElement("button");
        let btn_eliminar=document.createElement("button");

        btn_editar.classList.add("btn","btn-success");
        btn_editar.setAttribute("onclick","modalEditarProducto("+ `${JSON.stringify(producto)}` +")")   //`
        btn_editar.innerHTML="editar"


        btn_eliminar.setAttribute("onclick","modalEliminarProducto("+ `${JSON.stringify(producto)}` +")")
        btn_eliminar.classList.add("btn","btn-danger");
        btn_eliminar.innerHTML="eliminar"

        td_editar.appendChild(btn_editar);
        td_eliminar.appendChild(btn_eliminar);

        tr.appendChild(td_idProducto)
        tr.appendChild(td_nombre)
        tr.appendChild(td_precio)
        tr.appendChild(td_stock)
       // tr.appendChild(td_idProveedor);
        tr.appendChild(td_proveedor);
        tr.appendChild(td_fechaAlta);
        tr.appendChild(td_editar);
        tr.appendChild(td_eliminar);

        tbodyProductos.appendChild(tr);

    });

}


//--------------------------------------------
//-------------------------------------------
//FORMULARIO CREAR PRODUCTO
function listarProveedores(s){

    //let select=document.querySelector("select[name='proveedor']");

    s.innerHTML = "";

    proveedores.forEach(proveedor =>{
        
        let option=document.createElement("option");
        option.value=proveedor.dni;

        option.textContent=proveedor.nombre + " " + proveedor.apellido;

        s.appendChild(option);
    })

}


function formularioCrear(){
    
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
                  mode:"cors",
                //   credentials: 'same-origin',
                  headers:{
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                        },
                  body: JSON.stringify(postData)
                };

    return params; 
}



async function crearProducto(url){

    let params = formularioCrear();

    //"http://127.0.0.1:8000/compra/productos/agregar/"
    const response=await datos(url, params);

    if(response.success){

        listarProductos();
        msjAlert(1,response.msj)
    }
    else{
        msjAlert(2,response.msj)
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




//FUNCION QUE ABRE EL MODAL PARA EDITAR
function modalEditarProducto(producto){ 

    console.log("editar producto")
    console.log(producto)

    const myModal = new bootstrap.Modal(document.getElementById('modalEditarActualizar'))
    myModal.show()    
    
    let select=document.querySelector(" #selectProveedorU"); // select[name='proveedorU']
    listarProveedores(select) 

    let id_producto=document.querySelector("input[name='id_productoU']");
    let nombre=document.querySelector("input[name='nombreU']");
    let precio=document.querySelector("input[name='precioU']");
    let stock=document.querySelector("input[name='stockU']");
    
    id_producto.value = producto.id_producto;
    nombre.value = producto.nombre;
    precio.value = producto.precio;
    stock.value = producto.stock;
    select.value = producto.id_proveedor;

}



//FUNCION QUE RECOLECTA LOS DATOS PARA EDITAR
function datosEditarProducto(){ 

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let id_producto=document.querySelector("input[name='id_productoU']");
    let nombre=document.querySelector("input[name='nombreU']");
    let precio=document.querySelector("input[name='precioU']");
    let stock=document.querySelector("input[name='stockU']");
    let select=document.querySelector(" #selectProveedorU"); // select[name='proveedorU']

    // let value_id_proveedor = id_proveedor.options[id_proveedor.selectedIndex].value;
    
    let putData={
        "id_producto":id_producto.value,
        "nombre":nombre.value,
        "precio":precio.value,
        "stock":stock.value,
        "id_proveedor":select.value
    }

    console.log(putData)

    let params={
        method: 'PUT',
        mode:"cors",
      //   credentials: 'same-origin',
        headers:{
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
              },
        body: JSON.stringify(putData)
      };

    return params

}


//FUNCION QUE SE EJECUTA PARA ACTUALIZAR LOS PRODUCTOS
async function actualizarProducto(url){

    let params = datosEditarProducto()

    const response=await datos(url, params);

    if(response.success){

        listarProductos();
        msjAlert(1,response.msj)
    }
    else{
        msjAlert(2,response.msj)
    }

}





function modalEliminarProducto(producto){

    const modal= new bootstrap.Modal(document.getElementById("modalEliminarProducto"));
    modal.show();

    let id_producto=document.querySelector("input[name=id_productoD]");
    id_producto.value=producto.id_producto;
}

async function eliminarProducto(url){ 

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let id_producto=document.querySelector("input[name=id_productoD]");

    let deleteData={"id_producto":id_producto.value}

    let params={
        method: 'DELETE',
        mode:"cors",
      //   credentials: 'same-origin',
        headers:{
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
              },
        body: JSON.stringify(deleteData)
      };

    const response=await datos(url, params);

    if(response.success){
        
        listarProductos();
        msjAlert(1,response.msj)
    
    }else{
        msjAlert(2,response.msj)
        
    }

}


function msjAlert(cod, message){

    let divAlerta=document.getElementById("alerta");

    let div= document.createElement('div');
    let button= document.createElement('button');

    if(cod==1){
        div.classList.add("alert","alert-success","alert-dismissible","fade","show");
    }
    else if(cod==2){ 

        div.classList.add("alert","alert-danger","alert-dismissible","fade","show");
    }

    button.classList.add("btn-close");

    div.setAttribute("role", "alert");
    button.setAttribute("type","button");
    button.setAttribute("data-bs-dismiss","alert");
    button.setAttribute("aria-label","Close");

    div.textContent = message;
    div.appendChild(button);
    divAlerta.appendChild(div);
    
}