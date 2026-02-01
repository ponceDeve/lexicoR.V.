const buscador = document.getElementById('buscador');
const fichasContainer = document.querySelector('.contenedor-fichas');
const fichas = Array.from(fichasContainer.children);

buscador.addEventListener('input', () => {
  const valor = buscador.value.toLowerCase();

  fichas.forEach(ficha => {
    const palabra = ficha.querySelector('h2').textContent.toLowerCase();
    // Si coincide la primera letra o más, se muestra
    if (palabra.startsWith(valor)) {
      ficha.style.display = 'block';
    } else {
      ficha.style.display = 'none';
    }
  });

  // Reordenar las coincidencias al inicio
  const coincidencias = fichas.filter(f => f.style.display === 'block');
  const noCoinciden = fichas.filter(f => f.style.display === 'none');
  fichasContainer.innerHTML = '';
  coincidencias.forEach(f => fichasContainer.appendChild(f));
  noCoinciden.forEach(f => fichasContainer.appendChild(f));
});