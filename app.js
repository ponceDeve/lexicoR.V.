import { palabras } from './data.js';

// ------------------ Referencias al DOM ------------------
const contenedor = document.getElementById('glosario-container');
const buscador = document.getElementById('buscador');
const filtroAbc = document.getElementById('filtro-abc');
const header = document.getElementById('main-header');

// ------------------ Generar abecedario automáticamente ------------------
const letras = "abcdefghijklmnñopqrstuvwxyz".split("");
letras.forEach(l => {
  const option = document.createElement('option');
  option.value = l;
  option.textContent = l.toUpperCase();
  filtroAbc.appendChild(option);
});

// ------------------ Función para limpiar tildes ------------------
function normalizar(texto) {
  return texto
    .normalize("NFD")       // descompone caracteres con acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .toLowerCase();
}

// ------------------ Función de renderizado ------------------
function renderizar(texto = "", letra = "") {
  contenedor.innerHTML = "";

  const textoNorm = normalizar(texto);
  const letraNorm = normalizar(letra);

  const filtradas = palabras.filter(p => {
    const terminoNorm = normalizar(p.termino);

    // Solo coincidencia al inicio del término
    const coincideTexto = textoNorm === "" || terminoNorm.startsWith(textoNorm);
    const coincideLetra = letraNorm === "" || terminoNorm.startsWith(letraNorm);

    return coincideTexto && coincideLetra;
  });

  if (filtradas.length === 0) {
    contenedor.innerHTML = `<p class="mensaje-vacio">No hay esa palabra, memo. Sigue estudiando.</p>`;
    return;
  }

  // Fragmento para evitar repintados repetidos
  const fragment = document.createDocumentFragment();
  filtradas.forEach(p => {
    const div = document.createElement('div');
    div.className = 'ficha';
    div.innerHTML = `
      <div class="ficha-header">
        <span class="id">${p.id}</span>
        <h2>${p.termino}</h2>
      </div>
      <div class="ficha-body">
        <p class="def"><strong>Definición:</strong> ${p.definicion}</p>
        <div class="sin"><strong>Sinónimos:</strong> ${p.sinonimos}</div>
        <div class="ant"><strong>Antónimos:</strong> ${p.antonimos}</div>
      </div>
    `;
    fragment.appendChild(div);
  });
  contenedor.appendChild(fragment);
}

// ------------------ Función debounce ------------------
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ------------------ Eventos ------------------
buscador.addEventListener('input', debounce(() => {
  filtroAbc.value = ""; // Limpiamos filtro por letra si escribe
  renderizar(buscador.value, "");
}, 200));

filtroAbc.addEventListener('change', () => {
  buscador.value = ""; // Limpiamos buscador si elige letra
  renderizar("", filtroAbc.value);
});

// ------------------ Scroll header ------------------
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    header.classList.remove('header-visible');
    header.classList.add('header-hidden');
  } else {
    header.classList.remove('header-hidden');
    header.classList.add('header-visible');
  }
  lastScrollY = window.scrollY;
});

// ------------------ Inicialización ------------------
renderizar();
