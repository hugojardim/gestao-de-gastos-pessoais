import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdicionarGasto from "./AdicionarGasto";
import styles from "./TabelaGastos.module.css";
import TabelaHeader from "./TabelaHeader";
import { TotalGastosContext } from "../context/TotalGastos";
import RenderizarGastos from "./RenderizarGastos";

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
    "Necessário",
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
    return gastosContext;
  };

  const alternarOrdenacao = () => {
    const gastosOrdenados = [...gastosContext].sort((a, b) => {
      if (ordemAscendente) {
        return parseFloat(b.valor) - parseFloat(a.valor);
      } else {
        return parseFloat(a.valor) - parseFloat(b.valor);
      }
    });
    setGastosContext(gastosOrdenados);
    setOrdemAscendente(!ordemAscendente);
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
          <RenderizarGastos
            filtrarGastosPorCategoria={filtrarGastosPorCategoria}
            gastoEditando={gastoEditando}
            valoresEditados={valoresEditados}
            setValoresEditados={setValoresEditados}
            categoriaEditada={categoriaEditada}
            setCategoriaEditada={setCategoriaEditada}
            opcoesCategoria={opcoesCategoria}
            confirmarEdicao={confirmarEdicao}
            removerGasto={removerGasto}
            editarGasto={editarGasto}
          />
        </tbody>
        <tfoot>
          <tr>
            <div className={styles.saidaTotal}>
                <td>Total R$</td>
                <td className={styles.totalGastos}>{totalGastos}</td>
            </div>
            <td>
              <AdicionarGasto
                onAdicionar={adicionarGasto}
                opcoesCategoria={opcoesCategoria}
              />
            </td>
          </tr>
        </tfoot>
      </table>

      <button className={styles.btnresumo} onClick={handleClick}>Mostrar resumo</button>
    </div>
  );
}

export default TabelaGastos;