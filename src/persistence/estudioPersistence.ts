import connectDB from '../db/connectDB';
import Estudio from '../models/Estudio';

const conn = new connectDB();

export default class estudioPersistence {
    public static async selectAllEstudios(): Promise<Estudio[]> {
        const allEstudios = await conn
            .query('SELECT * FROM ESTUDIOS')
            .then((res) => {
                return res.rows.map((row: any) => Estudio.fromPostgresSql(row));
            })
            .catch((err) => {
                throw `Ocorreu um erro no select de estudios: \n\n${err}`;
            });

        return allEstudios;
    }

    public static async selectEstudio(cdEstudio: number): Promise<Estudio> {
        const estudio = await conn
            .query('SELECT * FROM ESTUDIOS WHERE CD_ESTUDIO = $1', [cdEstudio])
            .then((res) => {
                return Estudio.fromPostgresSql(res.rows[0]);
            })
            .catch((err) => {
                throw `Ocorreu um erro no select do estúdio com cod. ${cdEstudio}: \n\n${err}`;
            });

        return estudio;
    }

    public static async insertEstudio(estudio: Estudio): Promise<number> {
        const result = await conn
            .query(
                'INSERT INTO ESTUDIOS (CD_ENDERECO, NM_ESTUDIO) VALUES ($1, $2) RETURNING CD_ESTUDIO',
                [estudio.cdEndereco, estudio.nmEstudio],
            )
            .catch((err) => {
                throw `Ocorreu um erro na inserção do estúdio: \n\n${err}`;
            });
        const cdEstudio = result.rows[0].cd_estudio;

        return cdEstudio;
    }

    public static async updateEstudio(estudio: Estudio): Promise<string> {
        if (!estudio.cdEstudio) return 'Código do estúdio a alterar não informado!';

        await conn
            .query('UPDATE ESTUDIOS SET CD_ENDERECO = $1, NM_ESTUDIO = $2 WHERE CD_ESTUDIO = $3', [
                estudio.cdEndereco,
                estudio.nmEstudio,
                estudio.cdEstudio,
            ])
            .catch((err) => {
                throw `Ocorreu um erro na alteração do estúdio com código ${estudio.cdEstudio}: \n\n${err}`;
            });

        return `Estúdio com código ${estudio.cdEstudio} alterado com sucesso!`;
    }

    public static async deleteEstudio(cdEstudio: number): Promise<string> {
        const verExistencia = await conn
            .query('SELECT 1 FROM ESTUDIOS WHERE CD_ESTUDIO = $1', [cdEstudio])
            .then((res) => res.rowCount);

        if (!verExistencia) {
            return `Estúdio com código ${cdEstudio} não existe!`;
        } else {
            await conn
                .query('DELETE FROM ESTUDIOS WHERE CD_ESTUDIO = $1', [cdEstudio])
                .catch((err) => {
                    throw `Ocorreu um erro na remoção do estúdio com código ${cdEstudio}: \n\n${err}`;
                });
            return `Deleção do estúdio com código ${cdEstudio} bem sucedido.`;
        }
    }
}
