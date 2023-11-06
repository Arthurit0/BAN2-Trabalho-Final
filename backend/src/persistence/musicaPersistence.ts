import connectDB from '../db/connectDB';
import Musica from '../models/Musica';

const conn = new connectDB();

export default class musicaPersistence {
    public static async selectAllMusicas(): Promise<Musica[]> {
        const allMusicas = await conn.query('SELECT * FROM MUSICAS').then((res) => {
            return res.rows.map((row: any) => Musica.fromPostgresSql(row));
        });

        return allMusicas;
    }

    public static async selectMusicasFromDisco(cdDisco: number): Promise<Musica[]> {
        const musicasDoDisco = await conn
            .query(
                'SELECT * FROM MUSICAS LEFT JOIN MUSICAS_EM_DISCO USING(CD_MUSICA) WHERE CD_DISCO = $1',
                [cdDisco]
            )
            .then((res) => {
                return res.rows.map((row: any) => Musica.fromPostgresSql(row));
            });

        return musicasDoDisco;
    }

    public static async selectMusica(cdMusica: number): Promise<Musica> {
        const musica = await conn
            .query('SELECT * FROM MUSICAS WHERE CD_MUSICA = $1', [cdMusica])
            .then((res) => {
                return Musica.fromPostgresSql(res.rows[0]);
            });

        return musica;
    }

    public static async insertMusica(musica: Musica): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO MUSICAS (DS_TITULO, DS_GENERO, TP_DURACAO, FMT_ARQUIVO) VALUES ($1, $2, $3, $4) RETURNING CD_MUSICA',
                [musica.dsTitulo, musica.dsGenero, musica.tpDuracao, musica.fmtArquivo]
            );
            const cdMusica = result.rows[0].cd_musica;

            return cdMusica;
        } catch (err) {
            throw `Ocorreu um erro na inserção da nova música: ${musica.cdMusica}: ${err}`;
        }
    }

    public static async updateMusica(musica: Musica): Promise<string> {
        if (!musica.cdMusica) return 'Código da música a alterar não informado!';

        try {
            await conn.query(
                'UPDATE MUSICAS SET DS_TITULO = $1, DS_GENERO = $2, TP_DURACAO = $3, FMT_ARQUIVO = $4 WHERE CD_MUSICA = $5',
                [
                    musica.dsTitulo,
                    musica.dsGenero,
                    musica.tpDuracao,
                    musica.fmtArquivo,
                    musica.cdMusica,
                ]
            );

            return `Música com código ${musica.cdMusica} alterada com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração da música com código ${musica.cdMusica}: ${err}`;
        }
    }

    public static async deleteMusica(cdMusica: number): Promise<string> {
        const verExistencia = await conn
            .query('SELECT 1 FROM MUSICAS WHERE CD_MUSICA = $1', [cdMusica])
            .then((res) => res.rowCount);

        if (!verExistencia) {
            return `Música com código ${cdMusica} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM MUSICAS WHERE CD_MUSICA = $1', [cdMusica]);
                return `Deleção da música com código ${cdMusica} bem sucedida.`;
            } catch (err) {
                throw `Ocorreu um erro na remoção da música com código ${cdMusica}: ${err}`;
            }
        }
    }
}
