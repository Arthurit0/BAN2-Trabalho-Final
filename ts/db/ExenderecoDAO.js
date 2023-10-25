import connect from "./connectDB";

const db = await connect();

const enderecoModel = {
    async getAllEnderecos() {
        return await db.query('SELECT * FROM ENDERECO').then((res) => res.rows);
    },
    async getEndereco(codEnd) {
        return await db.query('SELECT * FROM ENDERECO WHERE COD_END = $1', [codEnd]).then((res) => res.rows)
    },
    async createEndereco(dados, telefone) {
        return await db.query('INSERT INTO ENDERECO (DADOS, TELEFONE) VALUES ($1, $2)', [dados, telefone]);
    },
    async alterEndereco(codEnd, dados, telefone) {
        return await db.query('UPDATE ENDERECO SET ')
    }
}

export default enderecoModel;