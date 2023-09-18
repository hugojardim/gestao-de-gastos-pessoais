import React, { useState } from 'react';
import stylesTabela from './TabelaGastos.module.css';


function AdicionarGasto({ onAdicionar, opcoesCategoria }) {
    const [gasto, setGasto] = useState({
        valor: '',
        data: '',
        descricao: '',
        categoria: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setGasto({
            ...gasto,
            [name]: value,
        });
    };

    const adicionarGasto = () => {
        
        switch (true) {
            case gasto.valor === '0':
                alert('Por favor, insira um valor maior que 0');
                return;
            case gasto.valor === '':
                alert('Por favor, insira um valor');
                return;
            case gasto.data === '':
                alert('Por favor, insira uma data');
                return;
            case gasto.categoria === '':
                alert('Por favor, insira uma categoria');
                return;
            case gasto.descricao === '':
                alert('Por favor, insira uma descrição');
                return;
            default:

                onAdicionar(gasto);
            
                setGasto({
                    valor: '',
                    data: '',
                    descricao: '',
                    categoria: '',
                });
        }
        
    };

    return (
        <>
            <div className={stylesTabela.campoInputGasto}>
                <input
                    type="number"
                    name="valor"
                    placeholder="Valor"
                    value={gasto.valor}
                    required
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="data"
                    placeholder="Data"
                    value={gasto.data}
                    required
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="descricao"
                    placeholder="Descrição"
                    value={gasto.descricao}
                    onChange={handleInputChange}
                />
                <select
                    name="categoria"
                    value={gasto.categoria}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione uma categoria</option>
                    {opcoesCategoria.map((opcao, index) => (
                        <option key={index} value={opcao}>
                            {opcao}
                        </option>
                    ))}
                </select>
            </div>
            <button className={stylesTabela.btnAdicionarGasto} onClick={adicionarGasto}>Adicionar Gasto</button>
        </>
    );
}

export default AdicionarGasto;
