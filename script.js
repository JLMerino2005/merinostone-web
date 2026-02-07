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
    
    // D. INICIAR MENÚ CAMALEÓN
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) { // Si bajamos más de 50px
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });
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
// --- CONTADORES ANIMADOS (NÚMEROS MÁGICOS) ---
let valueDisplays = document.querySelectorAll(".num");
let interval = 2000; // Duración de la animación (2 segundos)

// Solo activamos la animación cuando la sección es visible
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let startValue = 0;
            let endValue = parseInt(entry.target.getAttribute("data-val"));
            let duration = Math.floor(interval / endValue);
            let counter = setInterval(function () {
                startValue += 1;
                entry.target.textContent = startValue;
                if (startValue == endValue) {
                    clearInterval(counter);
                }
            }, duration);
            observer.unobserve(entry.target); // Solo anima una vez
        }
    });
});

valueDisplays.forEach((label) => {
    observer.observe(label);
});// --- LÓGICA DEL PUNTERO DE LUJO ---
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

if(cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // El punto sigue al mouse instantáneamente
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // El círculo grande te sigue con un poco de retraso (efecto elegante)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
}
/* --- FUNCIÓN MAESTRA DE SCROLL (CONTROL TOTAL) --- */
window.onscroll = function() {
    controlarScroll();
};

function controlarScroll() {
    // 1. CÁLCULO PARA LA BARRA DE PROGRESO
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    
    let barra = document.getElementById("progress-bar");
    if(barra) {
        barra.style.width = scrolled + "%";
    }

    // 2. LÓGICA DEL BOTÓN "VOLVER ARRIBA"
    let mybutton = document.getElementById("myBtn");
    if (mybutton) {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // 3. LÓGICA DEL MENÚ CAMALEÓN
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    }
}
// --- SALUDO AUTOMÁTICO WHATSAPP ---
setTimeout(() => {
    const bubble = document.getElementById('whatsapp-bubble');
    if(bubble) {
        bubble.classList.add('show');
    }
}, 3000); // 3000 milisegundos = 3 segundos
// --- TÍTULO DINÁMICO (RETENCIÓN) ---
let docTitle = document.title; // Guardamos el título original
window.addEventListener("blur", () => {
    document.title = "👋 ¡No olvides tu cocina!";
});
window.addEventListener("focus", () => {
    document.title = docTitle; // Regresa al original cuando vuelve
});