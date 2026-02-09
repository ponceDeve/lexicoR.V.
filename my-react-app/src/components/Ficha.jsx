export function Ficha({ id, termino, definicion, sinonimos, antonimos }) {
  return (
    <div className="ficha">
      <div className="ficha-header">
        <span className="id">{id}</span>
        <h2>{termino}</h2>
      </div>
      <div className="ficha-body">
        <p className="def">
          <strong>Definición</strong>
          {definicion}
        </p>
        
        {/* Estos bloques ocupan todo el ancho y tienen letra grande en el CSS */}
        <div className="sin">
          <strong>Sinónimos</strong>
          {sinonimos}
        </div>
        
        <div className="ant">
          <strong>Antónimos</strong>
          {antonimos}
        </div>
      </div>
    </div>
  );
}