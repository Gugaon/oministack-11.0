// usamos para criar rotas
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// importamos as páginas - rotas
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

// Exportamos o router
// Aqui definimos os link das paginas para puxar
// o atributo exact força a comparar a rota exata
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>

                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />

                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />

            </Switch>
        </BrowserRouter>
    );
}