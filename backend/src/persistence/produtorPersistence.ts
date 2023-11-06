import connectDB from '../db/connectDB';
import Produtor from '../models/Produtor';

const conn = new connectDB();

export default class produtorPersistence {
    public static async selectAllProdutores(): Promise<Produtor[]> {
        const allProdutores = await conn.query('SELECT * FROM PRODUTORES').then((res) => {
            return res.rows.map((row: any) => Produtor.fromPostgresSql(row));
        });

        return allProdutores;
    }

    public static async selectProdutor(cdProdutor: number): Promise<Produtor> {
        const produtor = await conn
            .query('SELECT * FROM PRODUTORES WHERE CD_PRODUTOR = $1', [cdProdutor])
            .then((res) => {
                return Produtor.fromPostgresSql(res.rows[0]);
            });

        return produtor;
    }

    public static async insertProdutor(produtor: Produtor): Promise<number> {
        try {
            const result = await conn.query(
                'INSERT INTO PRODUTORES (CD_ENDERECO, NM_PRODUTOR, NM_EMPRESA) VALUES ($1, $2, $3) RETURNING CD_PRODUTOR',
                [produtor.cdEndereco, produtor.nmProdutor, produtor.nmEmpresa]
            );
            const cdProdutor = result.rows[0].cd_produtor;

            return cdProdutor;
        } catch (err) {
            throw `Ocorreu um erro na inserção do novo produtor: ${produtor.cdProdutor}: ${err}`;
        }
    }

    public static async updateProdutor(produtor: Produtor): Promise<string> {
        if (!produtor.cdProdutor) return 'Código do produtor a alterar não informado!';

        try {
            await conn.query(
                'UPDATE PRODUTORES SET CD_ENDERECO = $1, NM_PRODUTOR = $2, NM_EMPRESA = $3 WHERE CD_PRODUTOR = $4',
                [produtor.cdEndereco, produtor.nmProdutor, produtor.nmEmpresa, produtor.cdProdutor]
            );

            return `Produtor com código ${produtor.cdProdutor} alterado com sucesso!`;
        } catch (err) {
            throw `Ocorreu um erro na alteração do produtor com código ${produtor.cdProdutor}: ${err}`;
        }
    }

    public static async deleteProdutor(cdProdutor: number): Promise<string> {
        const verExistencia = await conn
            .query('SELECT 1 FROM PRODUTORES WHERE CD_PRODUTOR = $1', [cdProdutor])
            .then((res) => res.rowCount);

        if (!verExistencia) {
            return `Produtor com código ${cdProdutor} não existe!`;
        } else {
            try {
                await conn.query('DELETE FROM PRODUTORES WHERE CD_PRODUTOR = $1', [cdProdutor]);
                return `Deleção do produtor com código ${cdProdutor} bem sucedida.`;
            } catch (err) {
                throw `Ocorreu um erro na remoção do produtor com código ${cdProdutor}: ${err}`;
            }
        }
    }
}
