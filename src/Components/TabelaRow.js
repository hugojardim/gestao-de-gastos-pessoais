import React from 'react';

function TabelaRow({
  gasto,
  index,
  gastoEditando,
  valoresEditados,
  categoriaEditada,
  setValoresEditados,
  setCategoriaEditada,
  confirmarEdicao,
  removerGasto,
  editarGasto,
  opcoesCategoria,
}) {
  const estaEditando = gastoEditando === index;

  return (
    <tr key={index}>
      {/* ... Células da tabela ... */}
      <td>
        {estaEditando ? (
          <select
            value={categoriaEditada}
            onChange={(e) => setCategoriaEditada(e.target.value)}
          >
            {opcoesCategoria.map((opcao, index) => (
              <option key={index} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        ) : (
          gasto.categoria
        )}
      </td>
      {/* ... Botões de ação ... */}
    </tr>
  );
}

export default TabelaRow;
