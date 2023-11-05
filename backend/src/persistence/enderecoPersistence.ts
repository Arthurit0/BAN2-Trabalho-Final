import connectDB from '../db/connectDB';
import Endereco from '../models/Endereco';

const conn = new connectDB();

export default class enderecoPersistence {
    public async selectAllEnderecos(): Promise<Endereco[]> {
        const allEnderecos = await conn.query('SELECT * FROM ENDERECOS').then((res) => {
            return res.rows.map((row: any) => Endereco.fromPostgresSql(row));
        });

        return allEnderecos;
    }

    public async selectEndereco(cdEnd: number): Promise<Endereco> {
        const endereco = await conn
            .query('SELECT * FROM ENDERECOS WHERE CD_END = $1', [cdEnd])
            .then((res) => {
                return res.rows.map((row: any) => Endereco.fromPostgresSql(row));
            });

        return endereco;
    }

    public async insertEndereco(endereco: Endereco): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO ENDERECOS (NM_RUA, NR_CASA, NM_BAIRRO, NM_CIDADE, NM_ESTADO, NM_PAIS, DS_TELEFONE) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING CD_END',
                [
                    endereco.nmRua,
                    endereco.nrCasa,
                    endereco.nmBairro,
                    endereco.nmCidade,
                    endereco.nmEstado,
                    endereco.nmPais,
                    endereco.dsTelefone,
                ]
            );
            const cdEnd = result.rows[0].cd_end;

            return cdEnd;
        } catch (err) {
            throw `Ocorreu um erro na inserção do novo endereço: ${endereco.cdEnd}: ${err}`;
        }
    }

    public async updateEndereco(endereco: Endereco): Promise<string> {
        if (!endereco.cdEnd) return 'Código do endereço a alterar não informado!';

        try {
            await conn.query(
                'UPDATE ENDERECOS SET NM_RUA = $1, NR_CASA = $2, NM_BAIRRO = $3, NM_CIDADE = $4, NM_ESTADO = $5, NM_PAIS = $6, DS_TELEFONE = $7 WHERE CD_END = $8',
                [
                    endereco.nmRua,
                    endereco.nrCasa,
                    endereco.nmBairro,
                    endereco.nmCidade,
                    endereco.nmEstado,
                    endereco.nmPais,
                    endereco.dsTelefone,
                    endereco.cdEnd,
                ]
            );

            return `Endereço com código ${endereco.cdEnd} alterado com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração do endereço com código ${endereco.cdEnd}: ${err}`;
        }
    }

    public async deleteEndereco(cdEnd: number): Promise<string> {
        const verExistencia = await conn.query('SELECT 1 FROM ENDERECO WHERE CD_END = $1', [cdEnd]);

        if (!verExistencia.rowCount) {
            return `Endereço com código ${cdEnd} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM ENDERECOS WHERE CD_END = $1', [cdEnd]);
                return `Deleção do endereço com código ${cdEnd} bem sucedido.`;
            } catch (err) {
                throw `Ocorreu um erro na remoção do endereço com código ${cdEnd}: ${err}`;
            }
        }
    }
}
