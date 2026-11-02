from django.contrib import admin

# Register your models here.
from .models import Obra, Funcion, Reserva, Curso

admin.site.register(Obra)
admin.site.register(Funcion)
admin.site.register(Reserva)
admin.site.register(Curso)
