
from django.urls import path

from compra import views

#<int:created>
urlpatterns = [
    path('proveedores/', views.proveedores, name="proveedores"),
    path('proveedores/agregarProveedor/', views.crearProveedor, name="agregarProveedor"), 
    path('proveedores/listaProveedores/', views.listaProveedores), 
    path('proveedores/actualizarProveedor/<int:dni>', views.vistaActualizarProveedor, name="vistaActualizarProveedor"), 
    path('proveedores/proveedorActualizado/<int:dni>', views.actualizarProveedor, name="actualizarProveedor"), 
    path('proveedores/eliminar/<int:dni>', views.eliminarProveedor, name="eliminarProveedor"), 


    path('productos/', views.vistaProductos, name="productos"),
    path('productos/lista/', views.productos),
    path('productos/agregar/', views.crearProducto, name="crearProducto"),
    path('productos/actualizar/', views.actualizarProducto, name="actualizarProducto"),
    path('productos/eliminar/', views.eliminarProducto, name="eliminarProducto")
    
    
]