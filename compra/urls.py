
from django.urls import path

from compra import views

#<int:created>
urlpatterns = [
    path('proveedores/', views.proveedores, name="proveedores"),
    path('proveedores/agregarProveedor/', views.crearProveedor, name="agregarProveedor"), 
    path('proveedores/listaProveedores/', views.listaProveedores), 
    path('proveedores/actualizarProveedor/', views.actualizarProveedor, name="actualizarProveedor"), 

    path('productos/', views.vistaProductos, name="productos"),
    path('productos/lista/', views.productos),
    path('productos/agregar/', views.crearProducto)
    
]