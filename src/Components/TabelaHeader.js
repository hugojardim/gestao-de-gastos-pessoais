import React from 'react';

function TabelaHeader({ categoriaSelecionada, setCategoriaSelecionada, opcoesCategoria, alternarOrdenacao }) {
  return (
    <thead>
      <tr>
        <th>
            Valor
            <button onClick={alternarOrdenacao}>Ordenar</button>
        </th>
        <th>Data</th>
        <th>Descrição</th>
        <th>
          Categoria
          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            <option value="">Todas</option>
            {opcoesCategoria.map((opcao, index) => (
              <option key={index} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </th>
      </tr>
    </thead>
  );
}

export default TabelaHeader;
