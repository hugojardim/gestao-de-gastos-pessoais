import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdicionarGasto from "./AdicionarGasto";
import styles from "./TabelaGastos.module.css";
import TabelaHeader from "./TabelaHeader";
import { TotalGastosContext } from "../context/TotalGastos";

function TabelaGastos() {
  const { gastosContext, setGastosContext } = useContext(TotalGastosContext);
  const navigate = useNavigate();
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  const [gastoEditando, setGastoEditando] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({
    valor: "",
    data: "",
    descricao: "",
    categoria: "",
  });
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [categoriaEditada, setCategoriaEditada] = useState("");

  const opcoesCategoria = [
    "Urgente",
    "Importante",
    "Delegável",
    "Adiável",
    "Desnecessário",
  ];

  const adicionarGasto = (novoGasto) => {
    setGastosContext([...gastosContext, novoGasto]);
  };

  const removerGasto = (index) => {
    const gastosAtualizados = gastosContext.filter((_, i) => i !== index);
    setGastosContext(gastosAtualizados);
  };

  const editarGasto = (index) => {
    setGastoEditando(index);
    const { valor, data, descricao, categoria } = gastosContext[index];
    setValoresEditados({ valor, data, descricao, categoria });
    setCategoriaEditada(categoria);
  };

  const confirmarEdicao = () => {
    const gastosAtualizados = [...gastosContext];
    gastosAtualizados[gastoEditando] = {
      valor: valoresEditados.valor,
      data: valoresEditados.data,
      descricao: valoresEditados.descricao,
      categoria: categoriaEditada,
    };
    setGastosContext(gastosAtualizados);
    setGastoEditando(null);
    setCategoriaEditada("");
  };

  const filtrarGastosPorCategoria = () => {
    if (categoriaSelecionada) {
      return gastosContext.filter(
        ({ categoria }) => categoria === categoriaSelecionada
      );
    }
    return gastosContext; // Retorna todos os gastosContext se nenhuma categoria for selecionada
  };

  const alternarOrdenacao = () => {
    // Ordene os gastosContext com base no valor
    const gastosOrdenados = [...gastosContext].sort((a, b) => {
      if (ordemAscendente) {
        return parseFloat(b.valor) - parseFloat(a.valor);
      } else {
        return parseFloat(a.valor) - parseFloat(b.valor);
      }
    });

    // Atualize o estado de gastosContext e a ordem
    setGastosContext(gastosOrdenados);
    setOrdemAscendente(!ordemAscendente);
  };

  const RenderizarGastos = () => {
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

  const handleClick = () => {
    navigate("/resumo");
  };

  const totalGastos = gastosContext.reduce(
    (total, { valor }) => total + parseFloat(valor),
    0
  );

  return (
    <div className={styles.conjuntoTabela}>
      <table className={styles.tabelaGastos}>
        <TabelaHeader
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
          opcoesCategoria={opcoesCategoria}
          alternarOrdenacao={alternarOrdenacao}
        />
        <tbody className={styles.bodyGastos}>
          <RenderizarGastos />
        </tbody>
        <tfoot>
          <tr>
            <div className={styles.saidaTotal}>
                <td>Total R$</td>
                <td className={styles.totalGastos}>{totalGastos}</td>
            </div>
            <td>
              <AdicionarGasto onAdicionar={adicionarGasto} />
            </td>
          </tr>
        </tfoot>
      </table>

      <button className={styles.btnresumo} onClick={handleClick}>Mostrar resumo</button>
    </div>
  );
}

export default TabelaGastos;