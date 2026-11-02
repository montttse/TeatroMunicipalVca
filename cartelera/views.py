from django.shortcuts import render
from .models import Obra, Funcion, Curso
from django.utils import timezone
from django.db.models import Q

# Create your views here.
def cartelera_home(request):
    #fecha y hora actual
    ahora = timezone.localtime(timezone.now())
    hoy_fecha = ahora.date()
    ahora_hora = ahora.time()

    #Consultar las funciones y su obra relacionada
    funciones = Funcion.objects.filter(
        Q(fecha__gt=hoy_fecha) | Q(fecha=hoy_fecha, hora__gte=ahora_hora) #gt: greater than, gte: greater than or equal to
        ).select_related('obra').order_by('fecha', 'hora')

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