import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Form from "../Components/Form";
import DadosLogin from "../DadosLogin";
import style from './Login.module.css';

function Login() {

    const [dadosRecebidos, setDadosRecebidos] = useState('');
    const [redirecionarParaIndex, setRedirecionarParaIndex] = useState(false);

    const receberDadosDoFilho = (dados) => {
        setDadosRecebidos(dados);
        verificarCredenciais(dados);
    };
    
    function verificarCredenciais({email, senha}) {
        for (const dados of DadosLogin) {
          if (dados.email === email && dados.senha === senha) {
            setRedirecionarParaIndex(true);
            return true;
          }
        }
        alert("Credenciais estão em DadosLogin.js");
        return false;
    }

    if (redirecionarParaIndex) {
        return <Navigate to="/index" />;
    }

    return (
    <div className={style.centralizarLogin}>
        <div className={style.containerLogin}>
            <h2 className={style.titleLogin}>Tela de Login</h2>
            <Form enviarDadosParaPai={receberDadosDoFilho} />
        </div>
    </div>
    );
}

export default Login;
