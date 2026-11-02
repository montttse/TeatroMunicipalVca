from django.db import models
from django.contrib.auth.models import User  # Importamos el modelo de usuarios que ya trae Django

# 1. Tabla de Obras (Espectáculos)
class Obra(models.Model):
    #Opciones para categorias
    CATEGORIAS = [
        ('TEATRO', 'Teatro'),
        ('MUSICA', 'Música'),
        ('POESIA', 'Poesía'),
        ('DANZA', 'Danza'),
        ('COMEDIA', 'Comedia'),
        ('INFANTIL', 'Infantil'),
    ]

    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=20, choices=CATEGORIAS, default='TEATRO')
    imagen_url = models.URLField(blank=True, null=True) # Para la foto de la obra

    def __str__(self):
        return self.titulo  # Esto hace que en el panel se vea el título de la obra en lugar de "Obra object"

# 2. Tabla de Funciones (Días, horas y salas específicas para cada obra)
class Funcion(models.Model):
    TIPO_ACCESO_CHOICES = [
        ('PA', 'Pagado con Reserva'),
        ('GR', 'Gratuito con Reserva'),
        ('LG', 'Libre y Gratuito (Sin Reserva)'),
    ]


    # Relación de 1 a Muchos: Una obra puede tener muchas funciones
    obra = models.ForeignKey(Obra, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora = models.TimeField()
    aforo_disponible = models.IntegerField(default=100)
    precio = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        default=0,
        help_text="Precio en Gs. Deja en 0 si la función es Gratuita."
    )
    tipo_acceso = models.CharField(
        max_length=2,
        choices=TIPO_ACCESO_CHOICES,
        default='PA'
    )
    
    @property
    def requiere_reserva(self):
        """Indica si el boton debe abrir el modal o si es entrada libre"""
        return self.tipo_acceso != 'LG'

    def __str__(self):
        return f"{self.obra.titulo} - {self.get_tipo_acceso_display()}"

# 3. Tabla de Cursos (para la Escuela Municipal)
class Curso(models.Model):
    NIVELES = [
            ('P', 'Principiantes'),
            ('I', 'Intermedio'),
            ('A', 'Avanzado'),
            ('T', 'Todos los niveles'),
        ]

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    horario = models.CharField(max_length=100, help_text="Ej: Lunes y Miércoles")
    nivel = models.CharField(max_length=1, choices=NIVELES, default='T')
    activo = models.BooleanField(default=True, help_text="Desmarcar si el taller ya finalizó o no está activo")

    def __str__(self):
        return f"{self.nombre}"