import React, { useState } from 'react';
// Essa função faz com que não seja re-carregada uma pagina clicando o link
import { Link, useHistory } from 'react-router-dom';
// importando icons de react-icons
import { FiLogIn } from 'react-icons/fi';

// importando API de conexão com backend
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

// Trocamos </a> por Link
// href por to
export default function Logon() {

    // Chamando a conexão que começa com parametro '' vacio
    const [id, setId] = useState('');

    // Redirecionamento do usuário quando der sucesso
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            // se deu tudo certo vamos pegar o id
            // Salvando no localStorage dentro no navegador
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            // Redirecionamento quando der sucesso 
            history.push('/profile');

        } catch (err) {

            // retornando erro de login
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}