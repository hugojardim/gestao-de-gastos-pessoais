import React, { useState } from "react";
import Input from "./Input";
import inputStyle from './Input.module.css'
import styles from './Form.module.css'

function Form({ enviarDadosParaPai, cadastrarUser }) {
    function sendForm(e) {
        e.preventDefault();
        const submitButtonId = e.nativeEvent.submitter.id; // Obtenha o id do botão clicado

        if (submitButtonId === "submit") {
            enviarDadosParaPai({ email, senha });

        } else if (submitButtonId === "cadastro") {
            cadastrarUser({ email, senha });
            setEmail('');
            setSenha('');
        }
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handleSenhaChange(e) {
        setSenha(e.target.value);
    }

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <form className={styles.formLogin} onSubmit={sendForm}>
            <Input
                id="email"
                label="Email"
                value={email}
                required
                onChange={handleEmailChange}
            />
            <Input
                id="senha"
                label="Senha"
                value={senha}
                required
                onChange={handleSenhaChange}
            />
            <Input
                id="submit"
                className={inputStyle.submitButton}
                type="submit"
                value="Entrar"
            />
            <Input
                id="cadastro"
                className={inputStyle.btnCadastrar}
                type="submit"
                value="Cadastrar"
                onChange={cadastrarUser}
            />
        </form>
    );
}

export default Form;

