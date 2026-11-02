
// Mobile Menu Toggle    
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

//funcion para alternar el menu y color del boton
function toggleMenu(){
    const isHidden = mobileMenu.classList.toggle('hidden');

    mobileMenuBtn.classList.toggle('text-theater-gold', !isHidden);
    mobileMenuBtn.classList.toggle('text-gray-300', isHidden);
}

//al hacer click en el boton
mobileMenuBtn.addEventListener('click', toggleMenu);
    
// Cerrar el menu movil cuando se cliquea un link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.classList.remove('text-theater-gold');
        mobileMenuBtn.classList.add('text-gray-300');
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');


filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
            b.classList.remove('bg-theater-gold', 'text-black', 'shadow-md');
            b.classList.add('bg-theater-card', 'text-gray-300', 'border', 'border-white/10');
        });
        btn.classList.remove('bg-theater-card', 'text-gray-300', 'border', 'border-white/10');
        btn.classList.add('bg-theater-gold', 'text-black', 'shadow-md');

        const filterValue = btn.getAttribute('data-filter');

        eventCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });    
});

        
let precioUnitarioNum = 0;

function openModal(title, time, funcionId, precio) {
    const modal = document.getElementById('ticket-modal');
    document.getElementById('modal-event-title').innerText = title;
    document.getElementById('modal-event-time').innerText = time;

    const textoPrecio = precio || 'Gratuito';
    document.getElementById('modal-event-price').innerText = textoPrecio;

    //extraer los numeros del textoPrecio
    //si dice gratuito, o viene vacio, el valor es 0
    textoLimpio = textoPrecio.replace(/[^0-9.,\s]/g, "");

    const numero = textoLimpio.replace(/[.,\s]/g, "");

    precioUnitarioNum = parseInt(numero) || 0;

    //resetear el contador a 1 cada que se abre un modal
    const selectCant = document.getElementById('cantEntrada');
    if (selectCant) selectCant.value = '1';

    updateTotal();

    //mostrar el modal y bloquear el scroll de la pagina
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function abrirModalDesdeBoton(button) {
    const titulo = button.getAttribute('data-titulo');
    const fecha = button.getAttribute('data-fecha');
    const funcionId = button.getAttribute('data-id');
    const precio = button.getAttribute('data-precio');

    openModal(titulo, fecha, funcionId, precio);
}

function closeModal() {
    const modal = document.getElementById('ticket-modal');
    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';

    const form = document.getElementById('reserva-form');
    if (form){
        form.reset();
    }

    const selectCant = document.getElementById('cantEntrada');
    if (selectCant) {
        selectCant.value = '1';
    }
}

function showToast(title, message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-msg').innerText = message;

    toast.classList.remove('translate-y-32', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-32', 'opacity-0');
    }, 4000);
}

function handleTicketPurchase(event) {
    event.preventDefault();
    closeModal();
    showToast('¡Reserva Exitosa!', 'Tu solicitud de reserva ha sido registrada.');
}

function handleContactSubmit(event) {
    event.preventDefault();
    event.target.reset();
    showToast('¡Mensaje Enviado!', 'Nos pondremos en contacto contigo a la brevedad.');
}

function updateTotal() {
    const selectCant = document.getElementById('cantEntrada');
    const contenedorTotal = document.getElementById('modal-total-price');

    if (!selectCant || !contenedorTotal) return;

    const cant = parseInt(selectCant.value) || 1;
    const total = cant * precioUnitarioNum;

    //si el precio es mayor a 0, muestra el total, si es 0, muestra gratuito
    if (precioUnitarioNum > 0){
        contenedorTotal.innerText = `Gs. ${total.toLocaleString()}`;
    } else {
        contenedorTotal.innerText = 'Entrada Gratuita';
    }
}

function enviarWhatsapp(event) {
    event.preventDefault();

    //Numero del teatro (para demo se sustituye con mi numero personal)
    const numeroTeatro = "595991453603";

    //datos ingresados por el usuario
    const nombre = document.getElementById('cliente-nombre').value.trim();
    const telefono = document.getElementById('cliente-telefono').value.trim();
    const email = document.getElementById('cliente-email').value.trim();
    const cantidad = document.getElementById('cantEntrada').value;
    const totalPagar = document.getElementById('modal-total-price').innerText.trim();

    //datos de la funcion
    const obraTitulo = document.getElementById('modal-event-title').innerText.trim();
    const funcionFecha = document.getElementById('modal-event-time').innerText.trim();

    //Mensaje formateado
    const mensaje = `Hola Teatro Municipal, solicito una reserva con los siguientes datos:
    
🎭 *Obra:* ${obraTitulo}                
📅 *Función:* ${funcionFecha}

🎟️ *Cantidad:* ${cantidad} entrada(s)
💰 *Total a Pagar:* ${totalPagar}

👤 *Nombre:* ${nombre}
📞 *Teléfono:* ${telefono}
✉️ *Correo:* ${email}`;
                            
    //enlace
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${numeroTeatro}?text=${mensajeCodificado}`;
    window.open(urlWhatsApp, '_blank');
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('ticket-modal');

    if (e.target === modal) {
        closeModal();
    }
});