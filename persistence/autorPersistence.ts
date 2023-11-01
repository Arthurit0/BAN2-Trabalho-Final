import connectDB from '../db/connectDB';
import { Autor, Musico } from '../models/Autor';

const conn = new connectDB();

export default class autorPersistence {
    public async querySelectAllMusicos(): Promise<Musico[]> {
        const allMusicos = await conn.query('Select * from musico').then((res) => {
            return res.rows.map((row) => {
                return new Musico(
                    row.cd_autor,
                    row.nr_reg,
                    row.cd_end,
                    row.nm_musico,
                    row.nm_artistico
                );
            });
        });

        return allMusicos;
    }
}
