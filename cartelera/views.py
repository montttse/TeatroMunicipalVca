from django.shortcuts import render
from .models import Obra, Funcion, Curso

# Create your views here.
def cartelera_home(request):
    #Consultar las funciones y su obra relacionada
    funciones = Funcion.objects.select_related('obra').all().order_by('fecha', 'hora')

    #Todas las obras registradas
    obras = Obra.objects.all()

    #Empaquetamos en un diccionario
    contexto = {
        'funciones': funciones,
        'obras': obras,
    }

    return render(request, 'cartelera/index.html', contexto)

def escuela_cursos_view(request):
    cursos = Curso.objects.filter(activo=True)

    return render(request, 'cartelera/escuela.html', {'cursos': cursos})

def sobre_el_teatro_view(request):
    return render(request, 'cartelera/sobre_el_teatro.html')

def contacto_view(request):
    return render(request, 'cartelera/contacto.html')