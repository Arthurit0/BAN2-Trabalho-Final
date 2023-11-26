import _ from 'lodash';
import mongoose from 'mongoose';

export default class Instrumento {
    private _cdInstrumento!: string;
    private _cdEstudio!: string;
    private _nmInstrumento!: string;
    private _tipoInstrumento?: string;
    private _nmMarca?: string;

    public get cdInstrumento(): string {
        return this._cdInstrumento;
    }

    public set cdInstrumento(cdInstrumento: string) {
        this._cdInstrumento = cdInstrumento;
    }

    public get cdEstudio(): string {
        return this._cdEstudio;
    }

    public set cdEstudio(cdEstudio: string) {
        this._cdEstudio = cdEstudio;
    }

    public get nmInstrumento(): string {
        return this._nmInstrumento;
    }

    public set nmInstrumento(nmInstr: string) {
        this._nmInstrumento = nmInstr;
    }

    public get tipoInstrumento(): string | undefined {
        return this._tipoInstrumento;
    }

    public set tipoInstrumento(tipInstr: string | undefined) {
        this._tipoInstrumento = tipInstr;
    }

    public get nmMarca(): string | undefined {
        return this._nmMarca;
    }

    public set nmMarca(nmMarca: string | undefined) {
        this._nmMarca = nmMarca;
    }

    public static fromPostgresSql(res: any): Instrumento {
        const instrumento = new this();

        instrumento._cdInstrumento = res.cd_instrumento;
        instrumento._cdEstudio = res.cd_estudio;
        instrumento._nmInstrumento = res.nm_instrumento;
        instrumento._tipoInstrumento = res.tipo_instrumento;
        instrumento._nmMarca = res.nm_marca;

        return instrumento;
    }

    public static fromMongoDB(res: IInstrumento): Instrumento {
        const instrumento = new this();

        instrumento._cdInstrumento = res._id.toString();
        instrumento._cdEstudio = res.cdEstudio.toString();
        instrumento._nmInstrumento = res.nmInstrumento;
        instrumento._tipoInstrumento = res.tipoInstrumento;
        instrumento._nmMarca = res.nmMarca;

        return instrumento;
    }
}

const instrumentoSchema = new mongoose.Schema({
    cdEstudio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudio',
        required: true,
    },
    nmInstrumento: {
        type: 'string',
        required: true,
    },
    tipoInstrumento: {
        type: 'string',
        required: true,
    },
    nmMarca: 'string',
});

export interface IInstrumento extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    cdEstudio: mongoose.Types.ObjectId;
    nmInstrumento: string;
    tipoInstrumento: string;
    nmMarca?: string;
}

const instrumentosByMusicoSchema = new mongoose.Schema({
    cdInstrumento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instrumento',
        required: true,
    },
    nrReg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Musico',
        required: true,
    },
    dtUso: {
        type: Date,
        required: true,
    },
});

export interface IInstrumentosByMusico extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    cdInstrumento: mongoose.Types.ObjectId;
    nrReg: mongoose.Types.ObjectId;
    dtUso: Date;
}

instrumentosByMusicoSchema.index({ cdInstrumento: 1, nrReg: 1, dtUso: 1 }, { unique: true });

export const InstrumentoModel = mongoose.model<IInstrumento>('Instrumento', instrumentoSchema);

export const InstrumentosByMusicoModel = mongoose.model<IInstrumentosByMusico>(
    'InstrumentosByMusico',
    instrumentosByMusicoSchema,
    'instrumentos_by_musico',
);
