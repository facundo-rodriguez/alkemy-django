from django.db import models

# Create your models here.


class Proveedor(models.Model):
    
    dni=models.IntegerField(primary_key=True, unique=True, null=False, blank=False) #, max_length=20
    nombre=models.CharField(max_length=50, null=False, blank=False)
    apellido=models.CharField(max_length=100, null=False, blank=False)



class Producto(models.Model):
    
    id_producto = models.BigAutoField(primary_key=True, unique=True)
    nombre = models.CharField(max_length=100, blank=False, null=False )
    precio = models.FloatField()
    stock_actual = models.IntegerField()
    fk_proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, blank=False, null=False)
    fecha_alta=models.DateTimeField(auto_now_add=True)




