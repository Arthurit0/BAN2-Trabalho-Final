import connectDB from '../db/connectDB';
import Estudio from '../models/Estudio';

const conn = new connectDB();

export default class estudioPersistence {
    public static async selectAllEstudios(): Promise<Estudio[]> {
        const allEstudios = await conn.query('SELECT * FROM ESTUDIOS').then((res) => {
            return res.rows.map((row: any) => Estudio.fromPostgresSql(row));
        });

        return allEstudios;
    }

    public static async selectEstudio(cdEstudio: number): Promise<Estudio> {
        const estudio = await conn
            .query('SELECT * FROM ESTUDIOS WHERE CD_ESTUDIO = $1', [cdEstudio])
            .then((res) => {
                return Estudio.fromPostgresSql(res.rows[0]);
            });

        return estudio;
    }

    public static async insertEstudio(estudio: Estudio): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO ESTUDIOS (CD_ENDERECO, NM_ESTUDIO) VALUES ($1, $2) RETURNING CD_ESTUDIO',
                [estudio.cdEndereco, estudio.nmEstudio]
            );
            const cdEstudio = result.rows[0].cd_estudio;

            return cdEstudio;
        } catch (err) {
            throw `Ocorreu um erro na inserção do novo estúdio: ${estudio.cdEstudio}: ${err}`;
        }
    }

    public static async updateEstudio(estudio: Estudio): Promise<string> {
        if (!estudio.cdEstudio) return 'Código do estúdio a alterar não informado!';

        try {
            await conn.query(
                'UPDATE ESTUDIOS SET CD_ENDERECO = $1, NM_ESTUDIO = $2 WHERE CD_ESTUDIO = $3',
                [estudio.cdEndereco, estudio.nmEstudio, estudio.cdEstudio]
            );

            return `Estúdio com código ${estudio.cdEstudio} alterado com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração do estúdio com código ${estudio.cdEstudio}: ${err}`;
        }
    }

    public static async deleteEstudio(cdEstudio: number): Promise<string> {
        const verExistencia = await conn
            .query('SELECT 1 FROM ESTUDIOS WHERE CD_ESTUDIO = $1', [cdEstudio])
            .then((res) => res.rowCount);

        if (!verExistencia) {
            return `Estúdio com código ${cdEstudio} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM ESTUDIOS WHERE CD_ESTUDIO = $1', [cdEstudio]);
                return `Deleção do estúdio com código ${cdEstudio} bem sucedido.`;
            } catch (err) {
                throw `Ocorreu um erro na remoção do estúdio com código ${cdEstudio}: ${err}`;
            }
        }
    }
}
