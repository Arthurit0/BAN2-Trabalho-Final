import connectDB from '../db/connectDB';
import Musica from '../models/Musica';

const conn = new connectDB();

export default class musicaPersistence {
    public static async selectAllMusicas(): Promise<Musica[]> {
        const allMusicas = await conn
            .query('SELECT * FROM MUSICAS')
            .then((res) => {
                return res.rows.map((row: any) => Musica.fromPostgresSql(row));
            })
            .catch((err) => {
                throw `Ocorreu um erro no select de músicas: \n\n${err}`;
            });

        return allMusicas;
    }

    public static async selectMusicasFromDisco(cdDisco: number): Promise<Musica[]> {
        const musicasDoDisco = await conn
            .query(
                'SELECT * FROM MUSICAS LEFT JOIN MUSICAS_EM_DISCO USING(CD_MUSICA) WHERE CD_DISCO = $1',
                [cdDisco],
            )
            .then((res) => {
                return res.rows.map((row: any) => Musica.fromPostgresSql(row));
            })
            .catch((err) => {
                throw `Ocorreu um erro no select de músicas do disco com cod. ${cdDisco}: \n\n${err}`;
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
        const result = await conn
            .query(
                'INSERT INTO MUSICAS (DS_TITULO, DS_GENERO, TP_DURACAO, FMT_ARQUIVO) VALUES ($1, $2, $3, $4) RETURNING CD_MUSICA',
                [musica.dsTitulo, musica.dsGenero, musica.tpDuracao, musica.fmtArquivo],
            )
            .catch((err) => {
                throw `Ocorreu um erro na inserção da música: \n\n${err}`;
            });

        const cdMusica = result.rows[0].cd_musica;

        return cdMusica;
    }

    public static async updateMusica(musica: Musica): Promise<string> {
        if (!musica.cdMusica) return 'Código da música a alterar não informado!';

        await conn
            .query(
                'UPDATE MUSICAS SET DS_TITULO = $1, DS_GENERO = $2, TP_DURACAO = $3, FMT_ARQUIVO = $4 WHERE CD_MUSICA = $5',
                [
                    musica.dsTitulo,
                    musica.dsGenero,
                    musica.tpDuracao,
                    musica.fmtArquivo,
                    musica.cdMusica,
                ],
            )
            .catch((err) => {
                throw `Ocorreu um erro na alteração da música com código ${musica.cdMusica}: \n\n${err}`;
            });

        return `Música com código ${musica.cdMusica} alterada com sucesso!`;
    }

    public static async deleteMusica(cdMusica: number): Promise<string> {
        const verExistencia = await conn
            .query('SELECT 1 FROM MUSICAS WHERE CD_MUSICA = $1', [cdMusica])
            .then((res) => res.rowCount);

        if (!verExistencia) {
            return `Música com código ${cdMusica} não existe!`;
        } else {
            await conn
                .query('DELETE FROM MUSICAS WHERE CD_MUSICA = $1', [cdMusica])
                .catch((err) => {
                    throw `Ocorreu um erro na remoção da música com código ${cdMusica}: \n\n${err}`;
                });
            return `Deleção da música com código ${cdMusica} bem sucedida.`;
        }
    }

    public static async selectAutoresInMusica(): Promise<any> {
        return await conn
            .query(
                `SELECT DISTINCT A.CD_AUTOR,
                    CASE
                        WHEN M.NM_MUSICO IS NOT NULL THEN M.NM_MUSICO
                        WHEN B.NM_BANDA IS NOT NULL THEN B.NM_BANDA
                        ELSE NULL
                    END AS NM_AUTOR,
                    MUS.*
                FROM
                    AUTORES A
                    LEFT JOIN MUSICOS M ON A.CD_AUTOR = M.CD_AUTOR
                    LEFT JOIN BANDAS B ON A.CD_AUTOR = B.CD_AUTOR
                    INNER JOIN AUTORES_DA_MUSICA AM ON A.CD_AUTOR = AM.CD_AUTOR
                    INNER JOIN MUSICAS MUS ON AM.CD_MUSICA = MUS.CD_MUSICA
                ORDER BY CD_AUTOR`,
            )
            .then((res) => res.rows)
            .catch((err) => {
                throw `Erro no select dos autores de músicas: \n\n${err}`;
            });
    }

    public static async assignAutorInMusica(cdAutor: number, cdMusica: number): Promise<string> {
        await conn
            .query('INSERT INTO AUTORES_DA_MUSICA (CD_AUTOR, CD_MUSICA) VALUES ($1, $2)', [
                cdAutor,
                cdMusica,
            ])
            .catch((err) => {
                throw `Ocorreu um erro na inserção do autor com cod ${cdAutor} como participante da música com cod ${cdMusica}: \n\n${err}`;
            });

        return `Autor de código ${cdAutor} foi registrado como participante da música com código ${cdMusica}!`;
    }
}
