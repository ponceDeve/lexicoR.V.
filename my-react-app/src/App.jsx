import { useState, useEffect } from 'react';
import { palabras } from './data/lexico';
import { Ficha } from './components/Ficha';
import './index.css';

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [letra, setLetra] = useState("");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const abecedario = "abcdefghijklmnñopqrstuvwxyz".split("");

  // Lógica para ocultar/mostrar header al hacer scroll
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { 
        setVisible(false); // Bajando: oculta
      } else {
        setVisible(true);  // Subiendo: muestra
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const filtradas = palabras.filter(p => {
    const coincideTexto = p.termino.toLowerCase().includes(busqueda.toLowerCase());
    const coincideLetra = letra === "" || p.termino.toLowerCase().startsWith(letra);
    return coincideTexto && coincideLetra;
  });

  return (
    <div className="app-main">
      {/* Aplicamos clase dinámica según el estado visible */}
      <header className={`header-scroll ${visible ? 'active' : 'hidden'}`}>
        <h1>Léxico RV UNI 2026</h1>
        <div className="controles">
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setLetra(""); }}
          />
          <select value={letra} onChange={(e) => { setLetra(e.target.value); setBusqueda(""); }}>
            <option value="">A-Z</option>
            {abecedario.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
          </select>
        </div>
      </header>

      <main className="contenedor-fichas">
        {filtradas.length > 0 ? (
          filtradas.map(p => <Ficha key={p.id} {...p} />)
        ) : (
          <p className="mensaje-vacio">No hay esa palabra, memo.</p>
        )}
      </main>
    </div>
  );
}

export default App;