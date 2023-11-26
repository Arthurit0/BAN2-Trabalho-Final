import Estudio, { EstudioModel } from '../models/Estudio';

export default class estudioPersistence {
    public static async selectAllEstudios(): Promise<Estudio[]> {
        const estudioDocs = await EstudioModel.find({}).catch((err) => {
            throw `Ocorreu um erro no select de estudios: \n\n${err}`;
        });

        const allEstudios = estudioDocs.map((estudio) => {
            return Estudio.fromMongoDb(estudio);
        });

        return allEstudios;
    }

    public static async insertEstudio(estudio: Estudio): Promise<string> {
        const { cdEndereco, nmEstudio } = estudio;

        const newEstudio = await EstudioModel.create({
            cdEndereco,
            nmEstudio,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção do estúdio: \n\n${err}`;
        });

        return newEstudio._id.toString();
    }
}
