import React from "react";
import { Navigate } from "react-router-dom";
import TabelaGastos from "../Components/TabelaGastos";

function Index() {
  return (
    <>
        <h2>Tabela de Gastos</h2>
      
        <TabelaGastos />

                    

    </>
  );
}

export default Index;
