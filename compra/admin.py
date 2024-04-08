from django.contrib import admin

from compra.models import Producto, Proveedor

# Register your models here.

admin.site.register([Proveedor, Producto])