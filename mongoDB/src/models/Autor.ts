import _ from 'lodash';
import moment from 'moment';
import mongoose from 'mongoose';

export class Autor {
    private _cdAutor!: string;

    constructor(cdAutor: string) {
        this._cdAutor = cdAutor;
    }

    public set cdAutor(cdAutor: string) {
        this._cdAutor = cdAutor;
    }

    public get cdAutor(): string {
        return this._cdAutor;
    }
}

export class Musico extends Autor {
    private _nrReg!: string;
    private _cdEndereco?: string;
    private _nmMusico!: string;
    private _nmArtistico?: string;

    public set nrReg(nrReg: string) {
        this._nrReg = nrReg;
    }

    public get nrReg(): string {
        return this._nrReg;
    }

    public get cdEndereco(): string | undefined {
        return this._cdEndereco;
    }

    public set cdEndereco(cdEndereco: string | undefined) {
        this._cdEndereco = cdEndereco;
    }

    public get nmMusico(): string {
        return this._nmMusico;
    }

    public set nmMusico(nmMusico: string) {
        this._nmMusico = nmMusico;
    }

    public get nmArtistico(): string | undefined {
        return this._nmArtistico;
    }

    public set nmArtistico(strNmArtistico: string | undefined) {
        this._nmArtistico = strNmArtistico;
    }

    public static fromPostgresSql(res: any): Musico {
        const musico = new this(res.cd_autor);

        musico._nrReg = res.nr_reg;
        musico._cdEndereco = res.cd_endereco;
        musico._nmMusico = res.nm_musico;
        musico._nmArtistico = res.nm_artistico;
        return musico;
    }

    public static fromMongoDb(res: IMusico): Musico {
        const musico = new this(res.cdAutor.toString());

        musico._nrReg = res._id.toString();
        musico._cdEndereco = res.cdEndereco.toString();
        musico._nmMusico = res.nmMusico;
        musico._nmArtistico = res.nmArtistico;

        return musico;
    }
}

export class Banda extends Autor {
    private _cdBanda!: string;
    private _nmBanda!: string;
    private _dtFormacao?: Date | string;

    public get cdBanda(): string {
        return this._cdBanda;
    }

    public set cdBanda(cdBanda: string) {
        this._cdBanda = cdBanda;
    }

    public get nmBanda(): string {
        return this._nmBanda;
    }

    public set nmBanda(nmBanda: string) {
        this._nmBanda = nmBanda;
    }

    public get dtFormacao(): Date | string | undefined {
        return this._dtFormacao;
    }

    public set dtFormacao(dtFormacao: Date | string | undefined) {
        this._dtFormacao = dtFormacao;
    }

    public static fromPostgresSql(res: any): Banda {
        let banda = new this(res.cd_autor);

        banda._cdBanda = res.cd_banda;
        banda._nmBanda = res.nm_banda;
        banda._dtFormacao = moment(res.dt_formacao).format('DD/MM/YYYY');

        return banda;
    }

    public static fromMongoDb(res: IBanda): Banda {
        let banda = new this(res.cdAutor.toString());

        banda._cdBanda = res._id.toString();
        banda._nmBanda = res.nmBanda;
        banda._dtFormacao = moment.utc(res.dtFormacao).format('DD/MM/YYYY');

        return banda;
    }
}

const autorSchema = new mongoose.Schema({});

export interface IAutor extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
}

const musicoSchema = new mongoose.Schema({
    cdAutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
    },
    cdEndereco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Endereco',
    },
    nmMusico: { type: 'string', required: true },
    nmArtistico: 'string',
});

export interface IMusico extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    cdAutor: mongoose.Types.ObjectId;
    cdEndereco: mongoose.Types.ObjectId;
    nmMusico: 'string';
    nmArtistico?: 'string';
}

const bandaSchema = new mongoose.Schema({
    cdAutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
    },
    nmBanda: { type: 'string', required: true },
    dtFormacao: { type: Date, required: true },
});

export interface IBanda extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    cdAutor: mongoose.Types.ObjectId;
    nmBanda: 'string';
    dtFormacao: Date | 'string';
}

const musicosInBandaSchema = new mongoose.Schema({
    nrReg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Musico',
        required: true,
    },
    cdBanda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Banda',
        required: true,
    },
});

export interface IMusicosInBanda extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    nrReg: mongoose.Types.ObjectId;
    cdBanda: mongoose.Types.ObjectId;
}

musicosInBandaSchema.index({ nrReg: 1, cdBanda: 1 }, { unique: true });

export const AutorModel = mongoose.model<IAutor>('Autor', autorSchema, 'autores');
export const MusicoModel = mongoose.model<IMusico>('Musico', musicoSchema);
export const BandaModel = mongoose.model<IBanda>('Banda', bandaSchema);

export const MusicosInBandaModel = mongoose.model<IMusicosInBanda>(
    'MusicosInBanda',
    musicosInBandaSchema,
    'musicos_in_banda',
);
