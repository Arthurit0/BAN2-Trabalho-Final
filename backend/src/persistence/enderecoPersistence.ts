import connectDB from '../db/connectDB';
import Endereco from '../models/Endereco';

const conn = new connectDB();

export default class enderecoPersistence {
    public static async selectAllEnderecos(): Promise<Endereco[]> {
        const allEnderecos = await conn.query('SELECT * FROM ENDERECOS').then((res) => {
            return res.rows.map((row: any) => Endereco.fromPostgresSql(row));
        });

        return allEnderecos;
    }

    public static async selectEndereco(cdEndereco: number): Promise<Endereco> {
        const endereco = await conn
            .query('SELECT * FROM ENDERECOS WHERE CD_ENDERECO = $1', [cdEndereco])
            .then((res) => {
                return Endereco.fromPostgresSql(res.rows[0]);
            });

        return endereco;
    }

    public static async insertEndereco(endereco: Endereco): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO ENDERECOS (NM_RUA, NR_CASA, NM_BAIRRO, NM_CIDADE, NM_ESTADO, NM_PAIS, DS_TELEFONE) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING CD_ENDERECO',
                [
                    endereco.nmRua,
                    endereco.nrCasa,
                    endereco.nmBairro,
                    endereco.nmCidade,
                    endereco.nmEstado,
                    endereco.nmPais,
                    endereco.dsTelefone,
                ],
            );
            const cdEndereco = result.rows[0].cd_endereco;

            return cdEndereco;
        } catch (err) {
            throw `Ocorreu um erro na inserção do novo endereço: ${endereco.cdEndereco}: ${err}`;
        }
    }

    public static async updateEndereco(endereco: Endereco): Promise<string> {
        if (!endereco.cdEndereco) return 'Código do endereço a alterar não informado!';

        try {
            await conn.query(
                'UPDATE ENDERECOS SET NM_RUA = $1, NR_CASA = $2, NM_BAIRRO = $3, NM_CIDADE = $4, NM_ESTADO = $5, NM_PAIS = $6, DS_TELEFONE = $7 WHERE CD_ENDERECO = $8',
                [
                    endereco.nmRua,
                    endereco.nrCasa,
                    endereco.nmBairro,
                    endereco.nmCidade,
                    endereco.nmEstado,
                    endereco.nmPais,
                    endereco.dsTelefone,
                    endereco.cdEndereco,
                ],
            );

            return `Endereço com código ${endereco.cdEndereco} alterado com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração do endereço com código ${endereco.cdEndereco}: ${err}`;
        }
    }

    public static async deleteEndereco(cdEndereco: number): Promise<string> {
        const verExistencia = await conn
            .query('SELECT 1 FROM ENDERECOS WHERE CD_ENDERECO = $1', [cdEndereco])
            .then((res) => res.rowCount);

        if (!verExistencia) {
            return `Endereço com código ${cdEndereco} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM ENDERECOS WHERE CD_ENDERECO = $1', [cdEndereco]);
                return `Deleção do endereço com código ${cdEndereco} bem sucedido.`;
            } catch (err) {
                throw `Ocorreu um erro na remoção do endereço com código ${cdEndereco}: ${err}`;
            }
        }
    }
}
