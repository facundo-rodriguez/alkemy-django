

function modalPopUp(url){
            
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
    myModal.show()        

    //const myModalAlternative = new bootstrap.Modal('#exampleModal',option)
    //myModalAlternative.show()
    
    // let dniBorrar = document.querySelector("#btnFormEliminar input[name='dniBorrar']")
    // dniBorrar.value=dni
    //"http://127.0.0.1:8000/compra/proveedores/actualizarProveedor/"  `
    
    let form=document.getElementById('formPopUp')
    form.action=url

    console.log(url)
}