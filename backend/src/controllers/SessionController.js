// importamos nossa conexão de banco de dados
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        // O objetivo só verifica ser a ong realmente existe
        // começando buscando o id dentro do corpo da requisição
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first(); // 1:23:01

        // verificamos se existe para fazer um retorno
        if (!ong) {
            // Quando não existe um id
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        // Se tudo deu certo retorno os dados da ong
        return response.json(ong); // 1:23:25


    }
}