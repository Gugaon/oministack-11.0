// puxando conexão com o banco de dados
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // uso de paginação buscando dentro da requisição usando o parametro page
        const { page = 1 } = request.query;

        // Buscando todos os casos registrados //1:27:58
        // método count
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Dados da ong 1:31:5            .limit(5)
            .offset((page - 1) * 5) // (page - 1) para primeira pagina, só depois multiplicar 
            // próxima lógica seria (page - 2) * 5) e repetir 
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]); // select('*') antes do selecte limitamos o retorno, depois pulamos o registro
        // 1:26:38 fazendo vários cadastros 

        // Aqui retornamos o total de casos pelo cabeçalho
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async create(request, response) {
        // dados para cadastrar um incidente
        // fazemos desestruturação {}
        const { title, description, value } = request.body;

        // acessando com dados do cabeçalho autorizado
        const ong_id = request.headers.authorization;

        // inserindo dados no banco de dados
        // com a variavel [id]  buscado o id gerado
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id })
    },

    // criando controller para deletar um incidente
    async delete(request, response) {
        // pegar o id que vem da requisição
        const { id } = request.params;

        // pegando a id da ong logada
        const ong_id = request.headers.authorization;

        // buscando um incidente
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); // utilizamos first porque ele retorno um só resultado

        // verificação
        if (incident.ong_id != ong_id) {
            // Se der erro retornamos e trocamos o status para 401
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        // Se der tudo certo deletamos o incidente
        await connection('incidents').where('id', id).delete();

        // logo enviamos o estatus 204 quando a resposta não tem conteúdos
        return response.status(204).send();

    }

};