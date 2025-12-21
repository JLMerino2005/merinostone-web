document.addEventListener("DOMContentLoaded", function() {
    // 1. VERIFICAR MEMORIA (LocalStorage)
    if (localStorage.getItem("merinostone_access") === "granted") {
        const lockScreen = document.getElementById("tijuana-lock");
        if (lockScreen) {
            lockScreen.style.display = "none";
        }
    }

    // 2. INICIAR COMPARADORES
    initComparisons();
});

// --- FUNCIÓN 1: GATEKEEPER (CON MEMORIA) ---
function confirmarUbicacion(estaEnZona) {
    const lockScreen = document.getElementById("tijuana-lock");
    
    if (estaEnZona) {
        localStorage.setItem("merinostone_access", "granted");
        alert("Bienvenido a Merinostone. Zona de cobertura confirmada.");
        if(lockScreen) {
            lockScreen.style.opacity = "0";
            setTimeout(() => {
                lockScreen.style.display = "none";
            }, 500);
        }
    } else {
        alert("Lo sentimos. Por el momento solo cubrimos Tijuana, Rosarito, Tecate y Ensenada.");
        window.location.href = "https://www.google.com"; 
    }
}

// --- FUNCIÓN 2: WHATSAPP ---
function contactarVendedor(producto) {
    const telefono = "5216646738412"; 
    const mensaje = `Hola Merinostone. Mi proyecto es en Baja California y me interesa cotizar: ${producto}.`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// --- FUNCIÓN 3: COMPARADOR (SOPORTA VIDEO Y FOTO) ---
function initComparisons() {
    var x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }

    function compareImages(img) {
        var slider, img, clicked = 0, w, h;
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
            e.preventDefault();
            clicked = 1;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() {
            clicked = 0;
        }
        function slideMove(e) {
            var pos;
            if (clicked == 0) return false;
            pos = getCursorPos(e);
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

// --- FUNCIÓN 4: MENÚ DESPLEGABLE DE CONTACTO ---
function toggleContacto() {
    document.getElementById("contactoDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}