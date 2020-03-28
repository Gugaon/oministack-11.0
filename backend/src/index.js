const express = require('express');
const cors = require('cors');
// routes está carregando de src/routes.js
const routes = require('./routes');

const app = express();
/**
 * Falamos aqui para a aplicação que as requisições vão usar .json
 */
app.use(cors());
// Carregamento de github 1:34:20
app.use(express.json());
app.use(routes);

/**
 * Rota / Recursos
 */

/**
 * Métodos HTTP:
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota apôs "?" (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Route Params: Corpo da requisição, utilizado para criar ou alterar recursos
*/



app.listen(3333);

