import connectDB from '../db/connectDB';
import { Musico, Banda } from '../models/Autor';

const conn = new connectDB();

export default class autorPersistence {
    public static async selectAllMusicos(): Promise<Musico[]> {
        const allMusicos = await conn.query('SELECT * FROM MUSICOS').then((res) => {
            return res.rows.map((row: any) => Musico.fromPostgresSql(row));
        });

        return allMusicos;
    }

    public static async selectMusico(nrReg: number): Promise<Musico> {
        const musico = await conn
            .query('SELECT * FROM MUSICOS WHERE NR_REG = $1', [nrReg])
            .then((res) => {
                return Musico.fromPostgresSql(res.rows[0]);
            });

        return musico;
    }

    public static async selectAllBandas(): Promise<Banda[]> {
        const allBandas = await conn.query('SELECT * FROM BANDAS').then((res) => {
            return res.rows.map((row: any) => Banda.fromPostgresSql(row));
        });

        return allBandas;
    }

    public static async selectBanda(cdBanda: number): Promise<Banda> {
        const banda = await conn
            .query('SELECT * FROM BANDAS WHERE CD_BANDA = $1', [cdBanda])
            .then((res) => {
                return Banda.fromPostgresSql(res.rows[0]);
            });

        return banda;
    }

    public static async selectAllAutores(): Promise<any[]> {
        const allAutores = conn
            .query(
                `SELECT CD_AUTOR, NM_MUSICO AS NM_AUTOR FROM MUSICOS UNION
                                       SELECT CD_AUTOR, NM_BANDA AS NM_AUTOR FROM BANDAS ORDER BY CD_AUTOR;`,
            )
            .then((res) => res.rows);

        return allAutores;
    }

    public static async selectAllMusicosInBanda(): Promise<any[]> {
        const musicosInBanda = conn
            .query(
                `SELECT NM_ARTISTICO, NM_MUSICO, NM_BANDA FROM MUSICOS LEFT JOIN MUSICOS_EM_BANDA USING(NR_REG) LEFT JOIN BANDAS USING(CD_BANDA)`,
            )
            .then((res) => res.rows);

        return musicosInBanda;
    }

    public static async selectMusicosFromBanda(cdBanda: number): Promise<Musico[]> {
        const musicosDaBanda = await conn
            .query(
                'SELECT * FROM MUSICOS LEFT JOIN MUSICOS_EM_BANDA USING(NR_REG) WHERE CD_BANDA = $1',
                [cdBanda],
            )
            .then((res) => {
                return res.rows.map((row: any) => Musico.fromPostgresSql(row));
            });

        return musicosDaBanda;
    }

    public static async newCdAutor(): Promise<number> {
        return await conn.query('SELECT CRIA_AUTOR()').then((res) => res.rows[0].cria_autor);
    }

    public static async getCdAutorFromMusico(nrReg: number): Promise<number> {
        return await conn
            .query('SELECT CD_AUTOR FROM MUSICOS WHERE NR_REG = $1', [nrReg])
            .then((res) => res.rows[0].nr_reg);
    }

    public static async getCdAutorFromBanda(cdBanda: number): Promise<number> {
        return await conn
            .query('SELECT CD_AUTOR FROM BANDAS WHERE NR_REG = $1', [cdBanda])
            .then((res) => res.rows[0].nr_reg);
    }

    public static async getAutoresDaMusica(cdMusica: number): Promise<any> {
        return await conn
            .query(
                'SELECT * FROM AUTORES LEFT JOIN AUTORES_DA_MUSICA USING(CD_AUTOR) LEFT JOIN MUSICA USING CD_MUSICA = $1',
                [cdMusica],
            )
            .then((res) => res.rows);
    }

    public static async insertMusico(musico: Musico): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO MUSICOS (CD_AUTOR, CD_ENDERECO, NM_MUSICO, NM_ARTISTICO) VALUES ($1, $2, $3, $4) RETURNING NR_REG',
                [musico.cdAutor, musico.cdEndereco, musico.nmMusico, musico.nmArtistico],
            );

            const nrReg = result.rows[0].nr_reg;

            return nrReg;
        } catch (err) {
            throw `Ocorreu um erro na inserção do novo músico: ${err}`;
        }
    }

    public static async assignMusicoInBanda(nrReg: number, cdBanda: number): Promise<string> {
        try {
            await conn.query('INSERT INTO MUSICOS_EM_BANDA (NR_REG, CD_BANDA) VALUES ($1, $2)', [
                nrReg,
                cdBanda,
            ]);

            return `Músico de código ${nrReg} entrou na banda ${cdBanda}!`;
        } catch (err) {
            throw `Ocorreu um erro na inserção do músico na banda: ${err}`;
        }
    }

    public static async updateMusico(musico: Musico): Promise<string> {
        if (!musico.nrReg) return 'Código do músico a alterar não informado!';

        try {
            await conn.query(
                'UPDATE MUSICOS SET CD_AUTOR = $1, CD_ENDERECO = $2, NM_MUSICO = $3, NM_ARTISTICO = $4 WHERE NR_REG = $5',
                [
                    musico.cdAutor,
                    musico.cdEndereco,
                    musico.nmMusico,
                    musico.nmArtistico,
                    musico.nrReg,
                ],
            );

            return `Músico com Nr. Reg ${musico.nrReg} alterado com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração do músico com Nr. Reg ${musico.nrReg}: ${err}`;
        }
    }

    public static async deleteMusico(nrReg: number): Promise<string> {
        const verExistencia = await conn
            .query('SELECT 1 FROM MUSICOS WHERE NR_REG = $1', [nrReg])
            .then((res) => res.rowCount);

        if (!verExistencia) {
            return `Músico com Nr. Reg ${nrReg} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM MUSICOS WHERE NR_REG = $1', [nrReg]);
                return `Deleção do músico com Nr. Reg ${nrReg} bem sucedida.`;
            } catch (err) {
                throw `Ocorreu um erro na remoção do músico com Nr. Reg ${nrReg}: ${err}`;
            }
        }
    }

    public static async insertBanda(banda: Banda): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO BANDAS (CD_AUTOR, NM_BANDA, DT_FORMACAO) VALUES ($1, $2, $3) RETURNING CD_BANDA',
                [banda.cdAutor, banda.nmBanda, banda.dtFormacao],
            );
            const cdBanda = result.rows[0].cd_banda;

            return cdBanda;
        } catch (err) {
            throw `Ocorreu um erro na inserção da banda com código ${banda.cdBanda}: ${err}`;
        }
    }

    public static async updateBanda(banda: Banda): Promise<string> {
        if (!banda.cdBanda) return 'Código da banda a alterar não informado!';

        try {
            await conn.query(
                'UPDATE BANDAS SET NM_BANDA = $1, DT_FORMACAO = $2 WHERE CD_BANDA = $3',
                [banda.nmBanda, banda.dtFormacao, banda.cdBanda],
            );
            return `Banda com código ${banda.cdBanda} alterada com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração da banda com código ${banda.cdBanda}: ${err}`;
        }
    }

    public static async deleteBanda(cdBanda: number): Promise<string> {
        const verExistencia = await conn.query('SELECT 1 FROM BANDAS WHERE CD_BANDA = $1', [
            cdBanda,
        ]);

        if (!verExistencia.rowCount) {
            return `Banda com código ${cdBanda} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM BANDAS WHERE CD_BANDA = $1', [cdBanda]);
                return `Deleção da banda com código ${cdBanda} bem sucedida.`;
            } catch (err) {
                throw `Ocorreu um erro na remoção da banda com código ${cdBanda}: ${err}`;
            }
        }
    }
}
