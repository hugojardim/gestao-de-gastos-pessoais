import React, { useState } from 'react';
import AdicionarGasto from './AdicionarGasto';
import styles from './TabelaGastos.module.css';
import TabelaHeader from './TabelaHeader';
import TabelaRow from './TabelaRow';

function TabelaGastos() {
    const [gastos, setGastos] = useState([]);
    const [ordemAscendente, setOrdemAscendente] = useState(true);
    const [gastoEditando, setGastoEditando] = useState(null);
    const [valoresEditados, setValoresEditados] = useState({
        valor: '',
        data: '',
        descricao: '',
        categoria: '',
    });
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [categoriaEditada, setCategoriaEditada] = useState('');

    const opcoesCategoria = ['Urgente', 'Importante', 'Delegável', 'Adiável', 'Desnecessário'];

    const somaValores = () => {
        return gastos.reduce((total, { valor }) => total + parseFloat(valor), 0);
    };

    const adicionarGasto = (novoGasto) => {
        setGastos([...gastos, novoGasto]);
    };

    const removerGasto = (index) => {
        const gastosAtualizados = gastos.filter((_, i) => i !== index);
        setGastos(gastosAtualizados);
    };

    const editarGasto = (index) => {
        setGastoEditando(index);
        const { valor, data, descricao, categoria } = gastos[index];
        setValoresEditados({ valor, data, descricao, categoria });
        setCategoriaEditada(categoria);
    };

    const confirmarEdicao = () => {
        const gastosAtualizados = [...gastos];
        gastosAtualizados[gastoEditando] = {
            valor: valoresEditados.valor,
            data: valoresEditados.data,
            descricao: valoresEditados.descricao,
            categoria: categoriaEditada,
        };
        setGastos(gastosAtualizados);
        setGastoEditando(null);
        setCategoriaEditada('');
    };

    const filtrarGastosPorCategoria = () => {
        if(categoriaSelecionada) {
            return gastos.filter(({ categoria }) => categoria === categoriaSelecionada);
        }
        return gastos; // Retorna todos os gastos se nenhuma categoria for selecionada
    };    

    const alternarOrdenacao = () => {
        // Ordene os gastos com base no valor
        const gastosOrdenados = [...gastos].sort((a, b) => {
            if (ordemAscendente) {
                return parseFloat(b.valor) - parseFloat(a.valor);
                
            } else {
                return parseFloat(a.valor) - parseFloat(b.valor);
            }
        });

        // Atualize o estado de gastos e a ordem
        setGastos(gastosOrdenados);
        setOrdemAscendente(!ordemAscendente);
    };

    const renderizarGastos = () => {
        const gastosFiltrados = filtrarGastosPorCategoria();

        return gastosFiltrados.map((gasto, index) => {
            const estaEditando = gastoEditando === index;
            const { valor, data, descricao, categoria } = valoresEditados;
            
            return (
                <tr key={index}>
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
                    <td>
                        {estaEditando ? (
                            <button onClick={confirmarEdicao}>Confirmar</button>
                        ) : (
                            <>
                                <button onClick={() => removerGasto(index)}>Remover</button>
                                <button onClick={() => editarGasto(index)}>Editar</button>
                            </>
                        )}
                    </td>
                </tr>
            );
        });
    };

    return (
        <div>
            <table className={styles.tabelaGastos}>
                <TabelaHeader
                    categoriaSelecionada={categoriaSelecionada}
                    setCategoriaSelecionada={setCategoriaSelecionada}
                    opcoesCategoria={opcoesCategoria}
                    alternarOrdenacao={alternarOrdenacao}
                />
                <tbody>{renderizarGastos()}</tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td>{somaValores()}</td>
                        <td>
                            <AdicionarGasto onAdicionar={adicionarGasto} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default TabelaGastos;