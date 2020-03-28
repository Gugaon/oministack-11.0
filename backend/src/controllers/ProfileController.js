const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // acessando a ong autorizada
        const ong_id = request.headers.authorization;

        // Buscar todos os incidentes do banco
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);

    }
}