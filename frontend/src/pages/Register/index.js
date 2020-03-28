import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

// integração com backend realizamos api/axios
import api from '../../services/api';
import './styles.css';

// importando a logo
import logoImg from '../../assets/logo.svg';

// exportamos as página de register
export default function Register() {
    // almacenando os dados do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    // Levando o usuário para a home depois do envio de form
    const history = useHistory();

    // usando a api de integração
    // com o paramento e prevenimos o carregamento da página
    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        // Seção onde enviamos os dados do form para o backend
        // anteriormente ja definimos a urlbase
        // agora só definimos a rota/
        try {

            const response = await api.post('ongs', data);

            // mostrando mensajem para o usuário
            alert(`Seu ID de acesso: ${response.data.id}`);

            // configuração para enviar o user para home
            history.push('/');
        } catch (err) {
            alert("Erro de cadastro, tente novamente!");
        }
    }
    return (

        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e
                        ajude as pessoas da ONG!</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            style={{ width: 80 }} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    );
}