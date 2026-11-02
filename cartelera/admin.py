from django.contrib import admin

# Register your models here.
from .models import Obra, Funcion, Curso

admin.site.register(Obra)
admin.site.register(Funcion)
admin.site.register(Curso)
