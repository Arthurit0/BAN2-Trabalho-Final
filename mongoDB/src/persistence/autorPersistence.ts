import mongoose, { Document } from 'mongoose';
import {
    Musico,
    Banda,
    MusicoModel,
    BandaModel,
    AutorModel,
    MusicosInBandaModel,
    IMusico,
    IBanda,
} from '../models/Autor';

export default class autorPersistence {
    public static async newCdAutor(): Promise<string> {
        return await AutorModel.create({}).then((res) => res._id.toString());
    }

    public static async selectAllAutores(): Promise<(Banda | Musico)[]> {
        const musicosDocs = await MusicoModel.find({}).catch((err) => {
            throw `Ocorreu um erro no select de músicos para selectAllAutores: \n\n${err}`;
        });

        const musicos = musicosDocs.map((musico) => {
            return Musico.fromMongoDb(musico);
        });

        const bandasDocs = await BandaModel.find({}).catch((err) => {
            throw `Ocorreu um erro no select de bandas para selectAllAutores: \n\n${err}`;
        });

        const bandas = bandasDocs.map((banda) => {
            return Banda.fromMongoDb(banda);
        });

        const allAutores = [...musicos, ...bandas];

        return allAutores;
    }

    public static async selectAllMusicos(): Promise<Musico[]> {
        const musicosDocs = await MusicoModel.find({}).catch((err) => {
            throw `Ocorreu um erro no select de músicos: \n\n${err}`;
        });

        const allMusicos = musicosDocs.map((musico) => {
            return Musico.fromMongoDb(musico);
        });

        return allMusicos;
    }

    public static async insertMusico(musico: Musico): Promise<string> {
        const { cdAutor, cdEndereco, nmMusico, nmArtistico } = musico;

        const newMusico = await MusicoModel.create({
            cdAutor,
            cdEndereco,
            nmMusico,
            nmArtistico,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção do músico: \n\n${err}`;
        });

        return newMusico._id.toString();
    }

    public static async selectAllBandas(): Promise<Banda[]> {
        const bandasDocs = await BandaModel.find({}).catch((err) => {
            throw `Ocorreu um erro no select de bandas: \n\n${err}`;
        });

        const allBandas = bandasDocs.map((banda) => {
            return Banda.fromMongoDb(banda);
        });

        return allBandas;
    }

    public static async insertBanda(banda: Banda): Promise<string> {
        const { cdAutor, dtFormacao, nmBanda } = banda;

        const newBanda = await BandaModel.create({
            cdAutor,
            dtFormacao,
            nmBanda,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção da banda: \n\n${err}`;
        });

        return newBanda._id.toString();
    }

    public static async selectAllMusicosInBandas(): Promise<any> {
        const musicosInBandasDocs = await MusicosInBandaModel.find()
            .populate('nrReg')
            .populate('cdBanda')
            .exec()
            .catch((err) => {
                throw `Ocorreu um erro no select de músicos em bandas: \n\n${err}`;
            });

        const allMusicosInBandas = musicosInBandasDocs.map((musicoInBanda) => {
            const nrRegDoc = musicoInBanda.nrReg as unknown as IMusico;
            const cdBandaDoc = musicoInBanda.cdBanda as unknown as IBanda;

            const nrReg = Musico.fromMongoDb(nrRegDoc);
            const cdBanda = Banda.fromMongoDb(cdBandaDoc);

            return { nrReg, cdBanda };
        });

        return allMusicosInBandas;
    }

    public static async assignMusicoInBanda(nrReg: number, cdBanda: number) {
        await MusicosInBandaModel.create({
            nrReg,
            cdBanda,
        }).catch((err) => {
            throw `Ocorreu um erro na inserção do músico com nrReg ${nrReg} na banda com cod. ${cdBanda}: \n\n${err}`;
        });

        return `Músico de código ${nrReg} entrou na banda ${cdBanda}!`;
    }
}
