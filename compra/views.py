
from datetime import datetime
import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render

from compra.models import Producto, Proveedor

import jsonpickle

# Create your views here.



def proveedores(request):
    
    listaProveedores= list(Proveedor.objects.all() )

    return render(request, 'proveedor/proveedor.html', {'proveedores':listaProveedores , 'creado':None})   # HttpResponse("proveedor")


def crearProveedor(request):

    if request.method == 'POST':
        dni = request.POST['dni']
        nombre = request.POST['nombre']
        apellido = request.POST['apellido']
        
        proveedor=Proveedor.objects.create(dni=dni, nombre=nombre, apellido=apellido)
        
        listaProveedores= list(Proveedor.objects.all() )

        return render(request, 'proveedor/proveedor.html', {'proveedores':listaProveedores, 'creado': proveedor})
    


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


    return JsonResponse( listaProveedores,safe=False )




def vistaActualizarProveedor(request, dni):

    proveedor= Proveedor.objects.get(dni=dni)

    return render(request,'proveedor/actualizarProveedor.html', {"proveedor":proveedor, "status":False})



def actualizarProveedor(request):
    
    if request.method == 'POST':
        dni = request.POST['dni']
        nombre = request.POST['nombre']
        apellido = request.POST['apellido']
        
        proveedor=Proveedor.objects.get(dni=dni)
        proveedor.dni=dni
        proveedor.nombre=nombre
        proveedor.apellido=apellido
        proveedor.save()

        return render(request,'proveedor/actualizarProveedor.html', {"proveedor":proveedor, "status":True})
                


def eliminarProveedor(request):

    return HttpResponse(request.POST["dniBorrar"])



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


    return JsonResponse( productosJson,safe=False )



def crearProducto(request):

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
        return JsonResponse({'success':True}, safe=False)

    return JsonResponse({'success':'no funciona :/'}, safe=False)



