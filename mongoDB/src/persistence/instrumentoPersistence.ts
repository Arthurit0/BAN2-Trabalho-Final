import moment from 'moment';
import { IMusico, Musico } from '../models/Autor';
import Instrumento, {
    IInstrumento,
    InstrumentoModel,
    InstrumentosByMusicoModel,
} from '../models/Instrumento';

export default class instrumentoPersistence {
    public static async selectAllInstrumentos(): Promise<Instrumento[]> {
        const instrumentosDocs = await InstrumentoModel.find({}).catch((err) => {
            throw `Ocorreu um erro no select de instrumentos: \n\n${err}`;
        });

        const allInstrumentos = instrumentosDocs.map((intrumento) => {
            return Instrumento.fromMongoDB(intrumento);
        });

        return allInstrumentos;
    }

    public static async insertInstrumento(instrumento: Instrumento): Promise<string> {
        const { cdEstudio, nmInstrumento, nmMarca, tipoInstrumento } = instrumento;

        const newInstrumento = await InstrumentoModel.create({
            cdEstudio,
            nmInstrumento,
            nmMarca,
            tipoInstrumento,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção do novo instrumento: \n\n${err}`;
        });

        return newInstrumento._id.toString();
    }

    public static async selectAllInstrumentosByMusico(): Promise<Object[]> {
        const instrumentosByMusicoDocs = await InstrumentosByMusicoModel.find({})
            .populate('cdInstrumento')
            .populate('nrReg')
            .catch((err) => {
                throw `Ocorreu um erro no select de instrumentos usados por músicos: \n\n${err}`;
            });

        const allInstrumentosByMusico = instrumentosByMusicoDocs.map((instrumentoByMusico) => {
            const cdInstrumentodoc = instrumentoByMusico.cdInstrumento as unknown as IInstrumento;
            const nrRegDoc = instrumentoByMusico.nrReg as unknown as IMusico;

            const cdInstrumento = Instrumento.fromMongoDB(cdInstrumentodoc);
            const nrReg = Musico.fromMongoDb(nrRegDoc);

            return {
                cdInstrumento,
                nrReg,
                dtUso: moment.utc(instrumentoByMusico.dtUso).format('DD/MM/YYYY'),
            };
        });

        return allInstrumentosByMusico;
    }

    public static async assignInstrumentoByMusico(
        nrReg: number,
        cdInstrumento: number,
        dtUso: string,
    ): Promise<String> {
        await InstrumentosByMusicoModel.create({
            nrReg,
            cdInstrumento,
            dtUso,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção do músico com nrReg ${nrReg} tocando instrumento com cod. ${cdInstrumento} no dia ${dtUso}: \n\n${err}`;
        });

        return `Músico de cod. ${nrReg} tocou instrumento de cod. ${cdInstrumento} no dia ${dtUso}!`;
    }
}
