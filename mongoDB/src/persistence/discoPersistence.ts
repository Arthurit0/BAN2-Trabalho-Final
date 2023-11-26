import Disco, { DiscoModel, IDisco, MusicasInDiscoModel } from '../models/Disco';
import Musica, { IMusica } from '../models/Musica';

export default class discoPersistence {
    public static async selectAllDiscos(): Promise<Disco[]> {
        const discosDocs = await DiscoModel.find({}).catch((err) => {
            throw `Ocorreu um erro no select de discos: \n\n${err}`;
        });

        const allDiscos = discosDocs.map((disco) => {
            return Disco.fromMongoDb(disco);
        });

        return allDiscos;
    }

    public static async insertDisco(disco: Disco): Promise<string> {
        const { cdAutor, cdLocalGravacao, dsTitulo, dtGravacao } = disco;

        const newDisco = await DiscoModel.create({
            cdAutor,
            cdLocalGravacao,
            dsTitulo,
            dtGravacao,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção do disco: \n\n${err}`;
        });

        return newDisco._id.toString();
    }

    public static async selectAllMusicasInDiscos(): Promise<Object[]> {
        const musicasInDiscosDocs = await MusicasInDiscoModel.find({})
            .populate('cdMusica')
            .populate('cdDisco')
            .catch((err) => {
                throw `Ocorreu um erro no select de musicas em discos: \n\n${err}`;
            });

        const allMusicasInDiscos = musicasInDiscosDocs.map((musicaInDisco) => {
            const cdMusicaDoc = musicaInDisco.cdMusica as unknown as IMusica;
            const cdDiscoDoc = musicaInDisco.cdDisco as unknown as IDisco;

            const cdMusica = Musica.fromMongoDb(cdMusicaDoc);
            const cdDisco = Disco.fromMongoDb(cdDiscoDoc);

            return { cdMusica, cdDisco };
        });

        return allMusicasInDiscos;
    }

    public static async assignMusicaInDisco(cdMusica: number, cdDisco: number): Promise<string> {
        await MusicasInDiscoModel.create({
            cdMusica,
            cdDisco,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção da música com cod. ${cdMusica} no disco com cod. ${cdDisco}: \n\n${err}`;
        });

        return `A música com cod. ${cdMusica} agora faz parte do disco com cod. ${cdDisco}!`;
    }
}
