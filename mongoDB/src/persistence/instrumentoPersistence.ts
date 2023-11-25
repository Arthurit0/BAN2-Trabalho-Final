import connectDB from '../db/connectMongoDB';
import Instrumento from '../models/Instrumento';

const conn = new connectDB();

export default class instrumentoPersistence {
    public static async selectAllInstrumentos(): Promise<Instrumento[]> {
        const allInstrumentos = await conn
            .query('SELECT * FROM INSTRUMENTOS')
            .then((res) => {
                return res.rows.map((row: any) => Instrumento.fromPostgresSql(row));
            })
            .catch((err) => {
                throw `Ocorreu um erro no select de instrumentos: \n\n${err}`;
            });

        return allInstrumentos;
    }

    public static async selectInstrumento(cdInstrumento: number): Promise<Instrumento> {
        const instrumento = await conn
            .query('SELECT * FROM INSTRUMENTOS WHERE CD_INSTRUMENTO = $1', [cdInstrumento])
            .then((res) => {
                return Instrumento.fromPostgresSql(res.rows[0]);
            })
            .catch((err) => {
                throw `Ocorreu um erro no select do instrumento com cod. ${cdInstrumento}: \n\n${err}`;
            });

        return instrumento;
    }

    public static async insertInstrumento(instrumento: Instrumento): Promise<number> {
        const result = await conn
            .query(
                'INSERT INTO INSTRUMENTOS (CD_ESTUDIO, NM_INSTRUMENTO, TIPO_INSTRUMENTO, NM_MARCA) VALUES ($1, $2, $3, $4) RETURNING CD_INSTRUMENTO',
                [
                    instrumento.cdEstudio,
                    instrumento.nmInstrumento,
                    instrumento.tipoInstrumento,
                    instrumento.nmMarca,
                ],
            )
            .catch((err) => {
                throw `Ocorreu um erro na inserção do novo instrumento: \n\n${err}`;
            });
        const cdInstrumento = result.rows[0].cd_instrumento;

        return cdInstrumento;
    }

    public static async updateInstrumento(instrumento: Instrumento): Promise<string> {
        if (!instrumento.cdInstrumento) return 'Código do instrumento a alterar não informado!';

        await conn
            .query(
                'UPDATE INSTRUMENTOS SET CD_ESTUDIO = $1, NM_INSTRUMENTO = $2, TIPO_INSTRUMENTO = $3, NM_MARCA = $4 WHERE CD_INSTRUMENTO = $5',
                [
                    instrumento.cdEstudio,
                    instrumento.nmInstrumento,
                    instrumento.tipoInstrumento,
                    instrumento.nmMarca,
                    instrumento.cdInstrumento,
                ],
            )
            .catch((err) => {
                throw `Ocorreu um erro na alteração do instrumento com código ${instrumento.cdInstrumento}: \n\n${err}`;
            });

        return `Instrumento com código ${instrumento.cdInstrumento} alterado com sucesso!`;
    }

    public static async deleteInstrumento(cdInstrumento: number): Promise<string> {
        const verExistencia = await conn
            .query('SELECT 1 FROM INSTRUMENTOS WHERE CD_INSTRUMENTO = $1', [cdInstrumento])
            .then((res) => res.rowCount);

        if (!verExistencia) {
            return `Instrumento com código ${cdInstrumento} não existe!`;
        } else {
            await conn
                .query('DELETE FROM INSTRUMENTOS WHERE CD_INSTRUMENTO = $1', [cdInstrumento])
                .catch((err) => {
                    throw `Ocorreu um erro na remoção do instrumento com código ${cdInstrumento}: \n\n${err}`;
                });
            return `Deleção do instrumento com código ${cdInstrumento} bem sucedida.`;
        }
    }

    public static async selectAllInstrumentosByMusico(): Promise<any[]> {
        const instrumentoByMusico = conn
            .query(
                `SELECT DISTINCT NM_MUSICO, NM_ARTISTICO, CD_INSTRUMENTO, NM_INSTRUMENTO, DT_USO FROM TOCA_INSTR LEFT JOIN INSTRUMENTOS USING(CD_INSTRUMENTO) LEFT JOIN MUSICOS USING(NR_REG) ORDER BY CD_INSTRUMENTO`,
            )
            .then((res) => res.rows)
            .catch((err) => {
                throw `Ocorreu um erro no select de instrumentos usados por músicos: \n\n${err}`;
            });

        return instrumentoByMusico;
    }

    public static async assignInstrumentoByMusico(
        nrReg: number,
        cdInstrumento: number,
        dtUso: string,
    ): Promise<string> {
        await conn
            .query('INSERT INTO TOCA_INSTR (NR_REG, CD_INSTRUMENTO, DT_USO) VALUES ($1, $2, $3)', [
                nrReg,
                cdInstrumento,
                dtUso,
            ])
            .catch((err) => {
                throw `Ocorreu um erro na inserção do músico com nrReg ${nrReg} tocando instrumento com cod. ${cdInstrumento} no dia ${dtUso}: \n\n${err}`;
            });

        return `Músico de cod. ${nrReg} tocou instrumento de cod. ${cdInstrumento} no dia ${dtUso}!`;
    }
}
