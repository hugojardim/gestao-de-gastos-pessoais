import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Form from "../Components/Form";
import DadosLogin from "../DadosLogin";
import style from './Login.module.css';

function Login() {

    const [dadosRecebidos, setDadosRecebidos] = useState('');
    const [redirecionarParaIndex, setRedirecionarParaIndex] = useState(false);
    const dados = <DadosLogin/>;

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
        alert("Castrar novo usuário ou utilizar credenciais que estão em DadosLogin.js");
        return false;
    }

    function cadastrarUser({email, senha}) {
        dados.type.push({email: email, senha: senha});
        alert("Credenciais cadastradas com sucesso!");
    }

    if (redirecionarParaIndex) {
        return <Navigate to="/index" />;
    }
    
    return (
    <div className={style.centralizarLogin}>
        <div className={style.containerLogin}>
            <h2 className={style.titleLogin}>Tela de Login</h2>
            <Form enviarDadosParaPai={receberDadosDoFilho} cadastrarUser={cadastrarUser} />
        </div>
    </div>
    );
}

export default Login;
