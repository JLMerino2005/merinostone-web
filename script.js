/* --- script.js CORREGIDO --- */

// 1. EVENTO DE CARGA (PRELOADER / PANTALLA DE CARGA)
// Esto hace que la pantalla negra desaparezca cuando el sitio termina de cargar
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        // Pequeña pausa de 0.5s para suavidad
        setTimeout(() => {
            preloader.classList.add("loaded");
        }, 500);
    }
});

// 2. INICIALIZACIÓN (Cuando el HTML ya está listo)
document.addEventListener("DOMContentLoaded", function() {
    
    // A. GATEKEEPER (Memoria de Zona)
    const accessGranted = localStorage.getItem("merinostone_access");
    const lockScreen = document.getElementById("tijuana-lock");

    if (accessGranted === "granted" && lockScreen) {
        lockScreen.style.display = "none";
    }

    // B. LIBRERÍA DE ANIMACIONES (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // C. INICIAR FUNCIONES VISUALES
    initComparisons(); // Slider Antes/Después
    initLightbox();    // Modo Cine
});

// --- TUS FUNCIONES ---

// FUNCIÓN 1: GATEKEEPER
function validarZona(esLocal) {
    const lockScreen = document.getElementById("tijuana-lock");
    if (esLocal) {
        localStorage.setItem("merinostone_access", "granted");
        if(lockScreen) {
            lockScreen.style.opacity = "0";
            setTimeout(() => { lockScreen.style.display = "none"; }, 500);
        }
    } else {
        alert("Lo sentimos. Por el momento solo cubrimos Tijuana, Rosarito, Tecate y Ensenada.");
        window.location.href = "https://www.google.com"; 
    }
}

// FUNCIÓN 2: WHATSAPP SEGURO
function contactarVendedor(producto) {
    const telefono = "5216646738412"; 
    const mensaje = `Hola Merinostone. Mi proyecto es en Baja California y me interesa cotizar: ${producto}.`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

// FUNCIÓN 3: MENÚ CONTACTO (DROPDOWN)
function toggleContacto() {
    var dropdown = document.getElementById("contactoDropdown");
    if (dropdown) dropdown.classList.toggle("show");
}

// Cerrar menú si dan clic fuera
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show')) dropdowns[i].classList.remove('show');
        }
    }
}

// FUNCIÓN 4: MODO CINE (LIGHTBOX) - CORREGIDO
function initLightbox() {
    const modal = document.getElementById('lightbox');
    const modalImg = document.getElementById('imgDesplegada');
    const captionText = document.getElementById('caption');
    
    // Seleccionamos SOLO imágenes de productos para no romper el menú
    const images = document.querySelectorAll('.card-img-wrap img, .collection-card img');

    if (modal && modalImg) {
        images.forEach(img => {
            img.addEventListener('click', function(e) {
                // Si es una tarjeta de enlace (colección), prevenimos que navegue para ver la foto
                if(this.parentElement.classList.contains('collection-card')) {
                    e.preventDefault(); 
                }
                
                modal.style.display = "block";
                modalImg.src = this.src; 
                captionText.innerHTML = this.alt || "Merinostone Baja California";
            });
        });
    }
}

// Función para cerrar el cine desde el botón X
function cerrarCine() {
    const modal = document.getElementById('lightbox');
    if (modal) modal.style.display = "none";
}

// FUNCIÓN 5: COMPARADOR ANTES/DESPUÉS (SLIDER)
function initComparisons() {
    var x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }

    function compareImages(img) {
        var slider, clicked = 0, w, h;
        w = img.offsetWidth;
        h = img.offsetHeight;
        img.style.width = (w / 2) + "px";
        
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        img.parentElement.insertBefore(slider, img);
        
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        
        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchend", slideFinish);

        function slideReady(e) {
            e.preventDefault(); clicked = 1;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() { clicked = 0; }
        function slideMove(e) {
            if (clicked == 0) return false;
            var pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }
        function getCursorPos(e) {
            var a, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }
        function slide(x) {
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}

// FUNCIÓN 6: BOTÓN VOLVER ARRIBA
let mybutton = document.getElementById("myBtn");
if (mybutton) {
    window.onscroll = function() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    };
}
function topFunction() { 
    window.scrollTo({top: 0, behavior: 'smooth'}); 
}
// --- PROTECCIÓN CONTRA ROBO DE IMÁGENES ---
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault(); // Bloquea el clic derecho solo en fotos
    }
});