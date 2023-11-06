import connectDB from '../db/connectDB';
import Instrumento from '../models/Instrumento';

const conn = new connectDB();

export default class instrumentoPersistence {
    public static async selectAllInstrumentos(): Promise<Instrumento[]> {
        const allInstrumentos = await conn.query('SELECT * FROM INSTRUMENTOS').then((res) => {
            return res.rows.map((row: any) => Instrumento.fromPostgresSql(row));
        });

        return allInstrumentos;
    }

    public static async selectInstrumento(cdInstrumento: number): Promise<Instrumento> {
        const instrumento = await conn
            .query('SELECT * FROM INSTRUMENTOS WHERE CD_INSTRUMENTO = $1', [cdInstrumento])
            .then((res) => {
                return Instrumento.fromPostgresSql(res.rows[0]);
            });

        return instrumento;
    }

    public static async insertInstrumento(instrumento: Instrumento): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO INSTRUMENTOS (CD_ESTUDIO, NM_INSTR, TIP_INSTR, NM_MARCA) VALUES ($1, $2, $3, $4) RETURNING CD_INSTRUMENTO',
                [
                    instrumento.cdEstudio,
                    instrumento.nmInstr,
                    instrumento.tipInstr,
                    instrumento.nmMarca,
                ]
            );
            const cdInstrumento = result.rows[0].cd_instrumento;

            return cdInstrumento;
        } catch (err) {
            throw `Ocorreu um erro na inserção do novo instrumento: ${instrumento.cdInstrumento}: ${err}`;
        }
    }

    public static async updateInstrumento(instrumento: Instrumento): Promise<string> {
        if (!instrumento.cdInstrumento) return 'Código do instrumento a alterar não informado!';

        try {
            await conn.query(
                'UPDATE INSTRUMENTOS SET CD_ESTUDIO = $1, NM_INSTR = $2, TIP_INSTR = $3, NM_MARCA = $4 WHERE CD_INSTRUMENTO = $5',
                [
                    instrumento.cdEstudio,
                    instrumento.nmInstr,
                    instrumento.tipInstr,
                    instrumento.nmMarca,
                    instrumento.cdInstrumento,
                ]
            );

            return `Instrumento com código ${instrumento.cdInstrumento} alterado com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração do instrumento com código ${instrumento.cdInstrumento}: ${err}`;
        }
    }

    public static async deleteInstrumento(cdInstrumento: number): Promise<string> {
        const verExistencia = await conn
            .query('SELECT 1 FROM INSTRUMENTOS WHERE CD_INSTRUMENTO = $1', [cdInstrumento])
            .then((res) => res.rowCount);

        if (!verExistencia) {
            return `Instrumento com código ${cdInstrumento} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM INSTRUMENTOS WHERE CD_INSTRUMENTO = $1', [
                    cdInstrumento,
                ]);
                return `Deleção do instrumento com código ${cdInstrumento} bem sucedida.`;
            } catch (err) {
                throw `Ocorreu um erro na remoção do instrumento com código ${cdInstrumento}: ${err}`;
            }
        }
    }
}
