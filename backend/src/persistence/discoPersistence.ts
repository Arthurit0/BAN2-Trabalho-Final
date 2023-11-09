import connectDB from '../db/connectDB';
import Disco from '../models/Disco';

const conn = new connectDB();

export default class discoPersistence {
    public static async selectAllDiscos(): Promise<Disco[]> {
        const allDiscos = await conn.query('SELECT * FROM DISCOS').then((res) => {
            return res.rows.map((row: any) => Disco.fromPostgresSql(row));
        });

        return allDiscos;
    }

    public static async selectDisco(cdDisco: number): Promise<Disco> {
        const disco = await conn
            .query('SELECT * FROM DISCOS WHERE CD_DISCO = $1', [cdDisco])
            .then((res) => {
                return Disco.fromPostgresSql(res.rows[0]);
            });

        return disco;
    }

    public static async insertDisco(disco: Disco): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO DISCOS (CD_AUTOR, CD_LOCAL_GRAVACAO, DT_GRAV, DS_TITULO) VALUES ($1, $2, $3, $4) RETURNING CD_DISCO',
                [disco.cdAutor, disco.cdLocalGravacao, disco.dtGrav, disco.dsTitulo],
            );

            const cdDisco = result.rows[0].cd_disco;

            return cdDisco;
        } catch (err) {
            throw `Ocorreu um erro na inserção do novo disco: ${disco.cdDisco}: ${err}`;
        }
    }

    public static async updateDisco(disco: Disco): Promise<string> {
        console.log(disco);

        if (!disco.cdDisco) return 'Código do disco a alterar não informado!';

        try {
            await conn.query(
                'UPDATE DISCOS SET CD_AUTOR = $1, CD_LOCAL_GRAVACAO = $2, DT_GRAV = $3, DS_TITULO = $4 WHERE CD_DISCO = $5',
                [disco.cdAutor, disco.cdLocalGravacao, disco.dtGrav, disco.dsTitulo, disco.cdDisco],
            );

            return `Disco com código ${disco.cdDisco} alterado com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração do disco com código ${disco.cdDisco}: ${err}`;
        }
    }

    public static async deleteDisco(cdDisco: number): Promise<string> {
        const verExistencia = await conn
            .query('SELECT 1 FROM DISCOS WHERE CD_DISCO = $1', [cdDisco])
            .then((res) => res.rowCount);

        if (!verExistencia) {
            return `Disco com código ${cdDisco} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM DISCOS WHERE CD_DISCO = $1', [cdDisco]);
                return `Deleção do disco com código ${cdDisco} bem sucedida.`;
            } catch (err: any) {
                throw `Ocorreu um erro na remoção do disco com código ${cdDisco}: ${err}`;
            }
        }
    }
}
