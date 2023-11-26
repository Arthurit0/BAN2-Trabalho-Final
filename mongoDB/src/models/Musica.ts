import _ from 'lodash';
import mongoose from 'mongoose';

export default class Musica {
    private _cdMusica!: string;
    private _dsTitulo!: string;
    private _dsGenero?: string;
    private _tpDuracao?: Number;
    private _fmtArquivo?: string;

    public get cdMusica(): string {
        return this._cdMusica;
    }

    public set cdMusica(cdMusica: string) {
        this._cdMusica = cdMusica;
    }

    public get dsTitulo(): string {
        return this._dsTitulo;
    }

    public set dsTitulo(dsTitulo: string) {
        this._dsTitulo = dsTitulo;
    }

    public get dsGenero(): string | undefined {
        return this._dsGenero;
    }

    public set dsGenero(dsGenero: string) {
        this._dsGenero = dsGenero;
    }

    public get tpDuracao(): Number | undefined {
        return this._tpDuracao;
    }

    public set tpDuracao(tpDuracao: Number) {
        this._tpDuracao = tpDuracao;
    }

    public get fmtArquivo(): string | undefined {
        return this._fmtArquivo;
    }

    public set fmtArquivo(fmtArquivo: string) {
        this._fmtArquivo = fmtArquivo;
    }

    public static fromPostgresSql(res: any): Musica {
        const musica = new this();

        musica._cdMusica = res.cd_musica;
        musica._dsTitulo = res.ds_titulo;
        musica._dsGenero = res.ds_genero;
        musica._tpDuracao = res.tp_duracao;
        musica._fmtArquivo = res.fmt_arquivo;

        return musica;
    }

    public static fromMongoDb(res: IMusica): Musica {
        const musica = new this();

        musica._cdMusica = res._id.toString();
        musica._dsTitulo = res.dsTitulo;
        musica._dsGenero = res.dsGenero;
        musica._tpDuracao = res.tpDuracao;
        musica._fmtArquivo = res.fmtArquivo;

        return musica;
    }
}

const musicaSchema = new mongoose.Schema({
    dsTitulo: {
        type: 'string',
        required: true,
    },
    dsGenero: 'string',
    tpDuracao: Number,
    fmtArquivo: 'string',
});

export interface IMusica extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    dsTitulo: string;
    dsGenero?: string;
    tpDuracao?: Number;
    fmtArquivo?: string;
}

const autoresInMusicaSchema = new mongoose.Schema({
    cdAutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
        required: true,
    },
    cdMusica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Musica',
        required: true,
    },
});

export interface IAutoresInMusica extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    cdAutor: mongoose.Types.ObjectId;
    cdMusica: mongoose.Types.ObjectId;
}

autoresInMusicaSchema.index({ cdAutor: 1, cdMusica: 1 }, { unique: true });

export const MusicaModel = mongoose.model<IMusica>('Musica', musicaSchema);

export const AutoresInMusicaModel = mongoose.model<IAutoresInMusica>(
    'AutoresInMusica',
    autoresInMusicaSchema,
    'autores_in_musica',
);
