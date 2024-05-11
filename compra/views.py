
from datetime import datetime
import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render

from compra.models import Producto, Proveedor

import jsonpickle

# Create your views here.



def proveedores(request):
    
    listaProveedores= list(Proveedor.objects.all() )

    return render(request, 'proveedor/proveedor.html', {'proveedores':listaProveedores , 'status':False})   # HttpResponse("proveedor")


def crearProveedor(request):

    if request.method == 'POST':
        dni = request.POST['dni']
        nombre = request.POST['nombre']
        apellido = request.POST['apellido']
        
        proveedor=Proveedor.objects.create(dni=dni, nombre=nombre, apellido=apellido)
        
        listaProveedores= list(Proveedor.objects.all() )

        return render(request, 'proveedor/msjAccion.html', {'proveedor':listaProveedores, 'status':True,  'creado': proveedor , "mensaje":"proveedor creado con exito" })
    


def listaProveedores(request):

    proveedores= list(Proveedor.objects.all() )

    listaProveedores=[ 
                        {
                          "dni":proveedor.dni,
                          "nombre":proveedor.nombre,
                          "apellido":proveedor.apellido
                        }
                        for proveedor in proveedores
                    ]

    response=JsonResponse( listaProveedores,safe=False )
    response["Access-Control-Allow-Origin"]="*"

    return response




def vistaActualizarProveedor(request, dni):

    proveedor= Proveedor.objects.get(dni=dni)

    return render(request,'proveedor/actualizarProveedor.html', {"proveedor":proveedor, "status":False, "mensaje": ""})



def actualizarProveedor(request,dni):

        proveedor=Proveedor.objects.get(dni=dni)
        status=False
        msj="No se puede actualizar"

        if request.method == 'POST':
            dni = request.POST['dni']
            nombre = request.POST['nombre']
            apellido = request.POST['apellido']
            
            proveedor.dni=dni
            proveedor.nombre=nombre
            proveedor.apellido=apellido

            status=True
            msj="actualizado con exito"

            proveedor.save()

    
        return render(request,'proveedor/msjAccion.html', {"proveedor":proveedor, "status":status, "mensaje": msj})

        #return redirect(request,'proveedor/proveedor.html') #, {"proveedor":proveedor, "status":False, "mensaje": ""}
    



def eliminarProveedor(request,dni):

    Proveedor.objects.get(dni=dni).delete()
            
    listaProveedores= list(Proveedor.objects.all() )

    return render(request, 'proveedor/msjAccion.html', {'proveedor':listaProveedores, 'status':True,   "mensaje":"Eliminado" })
   


def vistaProductos(request):

    return render(request, 'producto/producto.html')



def productos(request):

    listaProductos= Producto.objects.all() 
   
    productosJson=[ 
                    { "id_producto": producto.id_producto,
                      "nombre":producto.nombre,
                      "precio":producto.precio,
                      "stock":producto.stock_actual,
                      "id_proveedor":producto.fk_proveedor.dni,
                      "proveedor":producto.fk_proveedor.nombre,
                      "fecha_alta": datetime.date( producto.fecha_alta )
                    }
                    for producto in listaProductos 
                ]

    response=JsonResponse( productosJson,safe=False )
    response["Access-Control-Allow-Origin"] = "*"
    
    return response



def crearProducto(request):

    try:
        if( request.method=="POST"):
            #recibo los datos en el cuerpo de la peticion, y tengo que convertirlos a json
            #el metodo loads de json lo que hace es convertir la cadena de texto en un objeto o diccionario.
            datos=json.loads(request.body.decode("utf-8"))
            
            nombre=datos["nombre"]
            precio=datos.get("precio") 
            stock=datos.get("stock")
            id_proveedor=datos["id_proveedor"]

            proveedor=Proveedor.objects.get(dni=id_proveedor)
        
            producto=Producto.objects.create(nombre=nombre, 
                                            precio=precio, 
                                            stock_actual=stock, 
                                            fk_proveedor=proveedor 
                                            )
            
            print("nombre ",precio)

            response=JsonResponse({'success':True, 'msj':"producto creado"}, safe=False)
            # response["Access-Control-Allow-Origin"] = "*"
            
            return response
        
        else:
            return JsonResponse({'success':False, 'msj':'no se pudo procesar la solicitud :/'}, safe=False)

    except:    
        
        response=JsonResponse({'success':False, 'msj':'no funciona :/'}, safe=False)
        return response


def actualizarProducto(request):
    
    try:

        if(request.method=="PUT"):
            datos= json.loads(request.body.decode('utf-8'))
            print(datos)

            producto=Producto.objects.get(id_producto=datos.get('id_producto'))
            
            producto.nombre=datos.get("nombre")
            producto.precio=datos.get("precio")
            producto.stock_actual=datos.get("stock")
            producto.fk_proveedor=Proveedor.objects.get(dni=datos.get("id_proveedor"))

            producto.save()

            return JsonResponse({'success':True, 'msj':"producto actualizado"}, safe= False)
        
        else:
            return JsonResponse({'success':False, 'msj':"no se pudo procesar la solicitud"}, safe= False)
            
    except:
        return JsonResponse({'success':False, 'msj':"No se actualizó el producto"}, safe= False)
    


def eliminarProducto(request):
    
    try:
        if(request.method=="DELETE"):
            datos= json.loads(request.body.decode('utf-8'))
            
            Producto.objects.get(id_producto=datos.get("id_producto")).delete()
            print(datos)

            return JsonResponse({'success':True, 'msj':"producto eliminado"}, safe= False)

        else:
            return JsonResponse({'success':False, 'msj':"no se pudo procesar la solicitud"}, safe= False)

    except:
         return JsonResponse({'success':False, 'msj':"el producto no se elimino"}, safe= False)
