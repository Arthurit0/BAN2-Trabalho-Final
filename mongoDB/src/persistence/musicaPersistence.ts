import { BandaModel, MusicoModel } from '../models/Autor';
import Musica, { AutoresInMusicaModel, MusicaModel } from '../models/Musica';

export default class musicaPersistence {
    public static async selectAllMusicas(): Promise<Musica[]> {
        const musicasDocs = await MusicaModel.find({}).catch((err) => {
            throw `Ocorreu um erro no select de músicas: \n\n${err}`;
        });

        const allMusicas = musicasDocs.map((musica) => {
            return Musica.fromMongoDb(musica);
        });

        return allMusicas;
    }

    public static async insertMusica(musica: Musica): Promise<string> {
        const { dsTitulo, dsGenero, tpDuracao, fmtArquivo } = musica;

        const newMusica = await MusicaModel.create({
            dsTitulo,
            dsGenero,
            tpDuracao,
            fmtArquivo,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção da música: \n\n${err}`;
        });

        return newMusica._id.toString();
    }

    public static async selectAutoresInMusica(): Promise<Object[]> {
        const autoresInMusicaDocs = await AutoresInMusicaModel.find({})
            .populate('cdMusica')
            .catch((err) => {
                throw `Erro no select dos autores de músicas: \n\n${err}`;
            });

        let allAutoresInMusicaDocs = await Promise.all(
            autoresInMusicaDocs.map(async (autorInMusica) => {
                let autorInfo;

                const musico = await MusicoModel.findOne({ cdAutor: autorInMusica.cdAutor });

                if (musico) autorInfo = musico;
                else {
                    const banda = await BandaModel.findOne({ cdAutor: autorInMusica.cdAutor });
                    if (banda) autorInfo = banda;
                }

                return { cdAutor: autorInfo, cdMusica: autorInMusica.cdMusica };
            }),
        );
        return allAutoresInMusicaDocs;
    }

    public static async assignAutorInMusica(cdAutor: number, cdMusica: number): Promise<string> {
        await AutoresInMusicaModel.create({
            cdAutor,
            cdMusica,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção do autor com cod ${cdAutor} como participante da música com cod ${cdMusica}: \n\n${err}`;
        });

        return `Autor de código ${cdAutor} foi registrado como participante da música com código ${cdMusica}!`;
    }
}
