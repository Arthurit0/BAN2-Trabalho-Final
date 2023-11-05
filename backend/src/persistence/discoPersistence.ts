import connectDB from '../db/connectDB';
import Disco from '../models/Disco';

const conn = new connectDB();

export default class DiscoPersistence {
    public async selectAllDiscos(): Promise<Disco[]> {
        const allDiscos = await conn.query('SELECT * FROM DISCOS').then((res) => {
            return res.rows.map((row: any) => Disco.fromPostgresSql(row));
        });

        return allDiscos;
    }

    public async selectDisco(cdDisco: number): Promise<Disco> {
        const disco = await conn
            .query('SELECT * FROM DISCOS WHERE CD_DISCO = $1', [cdDisco])
            .then((res) => {
                return res.rows.map((row: any) => Disco.fromPostgresSql(row));
            });

        return disco;
    }

    public async insertDisco(disco: Disco): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO DISCOS (CD_AUTOR, CD_PRODUTOR, CD_LOCAL_GRAVACAO, DT_GRAV, FMT_GRAV, DS_TITULO) VALUES ($1, $2, $3, $4, $5, $6) RETURNING CD_DISCO',
                [
                    disco.cdAutor,
                    disco.cdProdutor,
                    disco.cdLocalGravacao,
                    disco.dtGrav,
                    disco.fmtGrav,
                    disco.dsTitulo,
                ]
            );
            const cdDisco = result.rows[0].cd_disco;

            return cdDisco;
        } catch (err) {
            throw `Ocorreu um erro na inserção do novo disco: ${disco.cdDisco}: ${err}`;
        }
    }

    public async updateDisco(disco: Disco): Promise<string> {
        if (!disco.cdDisco) return 'Código do disco a alterar não informado!';

        try {
            await conn.query(
                'UPDATE DISCOS SET CD_AUTOR = $1, CD_PRODUTOR = $2, CD_LOCAL_GRAVACAO = $3, DT_GRAV = $4, FMT_GRAV = $5, DS_TITULO = $6 WHERE CD_DISCO = $7',
                [
                    disco.cdAutor,
                    disco.cdProdutor,
                    disco.cdLocalGravacao,
                    disco.dtGrav,
                    disco.fmtGrav,
                    disco.dsTitulo,
                ]
            );

            return `Disco com código ${disco.cdDisco} alterado com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração do disco com código ${disco.cdDisco}: ${err}`;
        }
    }

    public async deleteDisco(cdDisco: number): Promise<string> {
        const verExistencia = await conn.query('SELECT 1 FROM DISCOS WHERE CD_DISCO = $1', [
            cdDisco,
        ]);

        if (!verExistencia.rowCount) {
            return `Disco com código ${cdDisco} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM DISCOS WHERE CD_DISCO = $1', [cdDisco]);
                return `Deleção do disco com código ${cdDisco} bem sucedida.`;
            } catch (err: any) {
                if (err.code === '23503') {
                    // Código de erro do PostgreSQL para violação de chave estrangeira
                    return `O disco com código ${cdDisco} não pode ser deletado porque existem músicas relacionadas a ele.`;
                } else {
                    throw `Ocorreu um erro na remoção do disco com código ${cdDisco}: ${err}`;
                }
            }
        }
    }
}
