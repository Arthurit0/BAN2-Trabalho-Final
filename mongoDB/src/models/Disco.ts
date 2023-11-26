import _ from 'lodash';
import moment from 'moment';
import mongoose from 'mongoose';

export default class Disco {
    private _cdDisco!: string;
    private _cdAutor!: string;
    private _cdLocalGravacao?: string;
    private _dtGravacao?: Date | string;
    private _dsTitulo!: string;

    public get cdDisco(): string {
        return this._cdDisco;
    }

    public set cdDisco(cdDisco: string) {
        this._cdDisco = cdDisco;
    }

    public get cdAutor(): string {
        return this._cdAutor;
    }

    public set cdAutor(cdAutor: string) {
        this._cdAutor = cdAutor;
    }

    public get cdLocalGravacao(): string | undefined {
        return this._cdLocalGravacao;
    }

    public set cdLocalGravacao(cdLocalGravacao: string | undefined) {
        this._cdLocalGravacao = cdLocalGravacao;
    }

    public get dtGravacao(): Date | string | undefined {
        return this._dtGravacao;
    }

    public set dtGravacao(dtGrav: Date | string | undefined) {
        this._dtGravacao = dtGrav;
    }

    public get dsTitulo(): string | undefined {
        return this._dsTitulo;
    }

    public set dsTitulo(dsTitulo: string) {
        this._dsTitulo = dsTitulo;
    }

    public static fromPostgresSql(res: any): Disco {
        const disco = new this();

        disco._cdDisco = res.cd_disco;
        disco._cdAutor = res.cd_autor;
        disco._cdLocalGravacao = res.cd_local_gravacao;
        disco._dtGravacao = moment(res.dt_gravacao).format('DD/MM/YYYY');
        disco._dsTitulo = res.ds_titulo;

        return disco;
    }

    public static fromMongoDb(res: IDisco): Disco {
        const disco = new this();

        disco._cdDisco = res._id.toString();
        disco._cdAutor = res.cdAutor.toString();
        disco._cdLocalGravacao = res.cdLocalGravacao?.toString();
        disco._dtGravacao = moment.utc(res.dtGravacao).format('DD/MM/YYYY');
        disco._dsTitulo = res.dsTitulo;

        return disco;
    }
}

const discoSchema = new mongoose.Schema({
    cdAutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
        required: true,
    },
    cdLocalGravacao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudio',
    },
    dtGravacao: {
        type: Date,
        required: true,
    },
    dsTitulo: {
        type: 'string',
        required: true,
    },
});

export interface IDisco extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    cdAutor: mongoose.Types.ObjectId;
    cdLocalGravacao?: mongoose.Types.ObjectId;
    dtGravacao: Date;
    dsTitulo: string;
}

const musicasInDiscoSchema = new mongoose.Schema({
    cdMusica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Musica',
        required: true,
    },
    cdDisco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disco',
        required: true,
    },
});

export interface IMusicasInDisco extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    cdMusica: mongoose.Types.ObjectId;
    cdDisco: mongoose.Types.ObjectId;
}

musicasInDiscoSchema.index({ cdMusica: 1, cdDisco: 1 }, { unique: true });

export const DiscoModel = mongoose.model<IDisco>('Disco', discoSchema);

export const MusicasInDiscoModel = mongoose.model<IMusicasInDisco>(
    'MusicasInDisco',
    musicasInDiscoSchema,
    'musicas_in_disco',
);
