from django.urls import path
from .views import cartelera_home, escuela_cursos_view, sobre_el_teatro_view, contacto_view

urlpatterns = [
    #Definimos que la ruta raiz de la app apunte a nuestra vista
    path('', cartelera_home, name='cartelera_home'),
    path('escuela/', escuela_cursos_view, name='escuela_cursos'),
    path('sobre-el-teatro/', sobre_el_teatro_view, name='sobre_el_teatro'),
    path('contacto/', contacto_view, name='contacto')
]