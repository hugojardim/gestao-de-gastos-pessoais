import React from "react";
import { Navigate } from "react-router-dom";
import TabelaGastos from "../Components/TabelaGastos";
import styles from "./Index.module.css";

function Index() {
  return (
    <>
        <h2 className={styles.tituloTabela}>Tabela de Gastos</h2>
        <TabelaGastos />
    </>
  );
}

export default Index;
