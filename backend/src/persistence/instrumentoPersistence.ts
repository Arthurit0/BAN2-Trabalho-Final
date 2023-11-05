import connectDB from '../db/connectDB';
import Instrumento from '../models/Instrumento';

const conn = new connectDB();

export default class instrumentoPersistence {
    public async selectAllInstrumentos(): Promise<Instrumento[]> {
        const allInstrumentos = await conn.query('SELECT * FROM INSTRUMENTOS').then((res) => {
            return res.rows.map((row: any) => Instrumento.fromPostgresSql(row));
        });

        return allInstrumentos;
    }

    public async selectInstrumento(cdInstr: number): Promise<Instrumento> {
        const instrumento = await conn
            .query('SELECT * FROM INSTRUMENTOS WHERE CD_INSTR = $1', [cdInstr])
            .then((res) => {
                return res.rows.map((row: any) => Instrumento.fromPostgresSql(row));
            });

        return instrumento;
    }

    public async insertInstrumento(instrumento: Instrumento): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO INSTRUMENTOS (CD_ESTUDIO, NM_INSTR, TIP_INSTR, NM_MARCA) VALUES ($1, $2, $3, $4) RETURNING CD_INSTR',
                [
                    instrumento.cdEstudio,
                    instrumento.nmInstr,
                    instrumento.tipInstr,
                    instrumento.nmMarca,
                ]
            );
            const cdInstr = result.rows[0].cd_instr;

            return cdInstr;
        } catch (err) {
            throw `Ocorreu um erro na inserção do novo instrumento: ${instrumento.cdInstr}: ${err}`;
        }
    }

    public async updateInstrumento(instrumento: Instrumento): Promise<string> {
        if (!instrumento.cdInstr) return 'Código do instrumento a alterar não informado!';

        try {
            await conn.query(
                'UPDATE INSTRUMENTOS SET CD_ESTUDIO = $1, NM_INSTR = $2, TIP_INSTR = $3, NM_MARCA = $4 WHERE CD_INSTR = $5',
                [
                    instrumento.cdEstudio,
                    instrumento.nmInstr,
                    instrumento.tipInstr,
                    instrumento.nmMarca,
                    instrumento.cdInstr,
                ]
            );

            return `Instrumento com código ${instrumento.cdInstr} alterado com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração do instrumento com código ${instrumento.cdInstr}: ${err}`;
        }
    }

    public async deleteInstrumento(cdInstr: number): Promise<string> {
        const verExistencia = await conn.query('SELECT 1 FROM INSTRUMENTOS WHERE CD_INSTR = $1', [
            cdInstr,
        ]);

        if (!verExistencia.rowCount) {
            return `Instrumento com código ${cdInstr} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM INSTRUMENTOS WHERE CD_INSTR = $1', [cdInstr]);
                return `Deleção do instrumento com código ${cdInstr} bem sucedida.`;
            } catch (err) {
                throw `Ocorreu um erro na remoção do instrumento com código ${cdInstr}: ${err}`;
            }
        }
    }
}
