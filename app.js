import { palabras } from './data.js';

// Referencias al DOM - Los cimientos de nuestra lógica
const contenedor = document.getElementById('glosario-container');
const buscador = document.getElementById('buscador');
const filtroAbc = document.getElementById('filtro-abc');
const header = document.getElementById('main-header');

// 1. Generar el abecedario de forma automática para evitar yerros manuales
const letras = "abcdefghijklmnñopqrstuvwxyz".split("");
letras.forEach(l => {
    const option = document.createElement('option');
    option.value = l;
    option.textContent = l.toUpperCase();
    filtroAbc.appendChild(option);
});

// 2. Función para renderizar las fichas con léxico UNI
function renderizar(texto = "", letra = "") {
    contenedor.innerHTML = ""; // Limpiamos el contenedor

    const filtradas = palabras.filter(p => {
        const coincideTexto = p.termino.toLowerCase().includes(texto.toLowerCase()) || 
                             p.definicion.toLowerCase().includes(texto.toLowerCase());
        const coincideLetra = letra === "" || p.termino.toLowerCase().startsWith(letra);
        return coincideTexto && coincideLetra;
    });

    if (filtradas.length === 0) {
        contenedor.innerHTML = `<p class="mensaje-vacio">No hay esa palabra, memo. Sigue estudiando.</p>`;
        return;
    }

    filtradas.forEach(p => {
        const div = document.createElement('div');
        div.className = 'ficha';
        div.innerHTML = `
            <div class="ficha-header">
                <span class="id">${p.id}</span>
                <h2>${p.termino}</h2>
            </div>
            <div class="ficha-body">
                <p class="def"><strong>Definición</strong>${p.definicion}</p>
                <div class="sin"><strong>Sinónimos</strong>${p.sinonimos}</div>
                <div class="ant"><strong>Antónimos</strong>${p.antonimos}</div>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

// 3. Eventos de búsqueda (Diligencia en tiempo real)
buscador.addEventListener('input', () => {
    filtroAbc.value = ""; // Si escribe, reseteamos la letra
    renderizar(buscador.value, "");
});

filtroAbc.addEventListener('change', () => {
    buscador.value = ""; // Si elige letra, reseteamos el buscador
    renderizar("", filtroAbc.value);
});

// 4. Lógica de Scroll: Ocultar al bajar, mostrar al subir
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Bajando: El header se vuelve un óbice, lo ocultamos
        header.classList.remove('header-visible');
        header.classList.add('header-hidden');
    } else {
        // Subiendo: Necesitamos los controles, lo mostramos
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
    }
    lastScrollY = window.scrollY;
});

// Inicialización plenaria
renderizar();