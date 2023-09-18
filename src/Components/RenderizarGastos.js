import styles from "./TabelaGastos.module.css";

const RenderizarGastos = ({
  filtrarGastosPorCategoria, valoresEditados, setValoresEditados, categoriaEditada, setCategoriaEditada, gastoEditando, opcoesCategoria,
  removerGasto, editarGasto, confirmarEdicao
}) => {
  const gastosFiltrados = filtrarGastosPorCategoria();

  return gastosFiltrados.map((gasto, index) => {
    const estaEditando = gastoEditando === index;
    const { valor, descricao, categoria } = valoresEditados;

    return (
      <tr key={index}>
          <div className={styles.saidaGastos}>
              <td>
                  {estaEditando ? (
                  <input
                      type="text"
                      value={valor}
                      onChange={(e) =>
                      setValoresEditados({
                          ...valoresEditados,
                          valor: e.target.value,
                      })
                      }
                  />
                  ) : (
                  gasto.valor
                  )}
              </td>
              <td>{gasto.data}</td>
              <td>
                  {estaEditando ? (
                  <input
                      type="text"
                      value={descricao}
                      onChange={(e) =>
                      setValoresEditados({
                          ...valoresEditados,
                          descricao: e.target.value,
                      })
                      }
                  />
                  ) : (
                  gasto.descricao
                  )}
              </td>
              <td>
                  {estaEditando ? (
                  <select
                      value={categoria}
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
          </div>  
        <td>
          {estaEditando ? (
            <div className={styles.btnConfirmarEdicao}> 
              <button onClick={confirmarEdicao}>Confirmar</button>
            </div>
          ) : (
            <div className={styles.BotoesGasto}>
              <button className={styles.btnRemover} onClick={() => removerGasto(index)}>Remover</button>
              <button className={styles.btnEditar} onClick={() => editarGasto(index)}>Editar</button>
            </div>
          )}
        </td>
      </tr>
    );
  });
};

export default RenderizarGastos;