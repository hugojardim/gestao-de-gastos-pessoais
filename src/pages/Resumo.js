import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TotalGastosContext } from "../context/TotalGastos";
import styles from "./Resumo.module.css";

export const Resumo = () => {
  const { gastosContext } = useContext(TotalGastosContext);
  const navigate = useNavigate();

  const totalGastos = gastosContext.reduce(
    (total, { valor }) => total + parseFloat(valor),
    0
  );

  return (
    <div className={styles.containerResumo}>
      <h1>Resumo dos Gastos</h1>
      <h3>Gasto total: R${totalGastos}</h3>
      {gastosContext.length === 0 && <p>Não existem gastos até o momento</p>}
      <div>
      {gastosContext.map((gasto) => (
        <div className={styles.containerGasto}>
            <div>
                <p>Valor: {gasto.valor}</p>
            </div>
            <div>    
                <p>Data: {gasto.data}</p>
            </div>
            <div>    
                <p>Descrição: {gasto.descricao}</p>
            </div>
            <div>    
                <p>Categoria: {gasto.categoria}</p>
            </div>
        </div>
      ))}
      </div>
      <button className={styles.btnVoltarResumo} onClick={() => navigate("/index")}>voltar</button>
    </div>
  );
};