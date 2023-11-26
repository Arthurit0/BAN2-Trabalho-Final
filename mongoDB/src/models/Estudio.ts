import _ from 'lodash';
import mongoose from 'mongoose';

export default class Estudio {
    private _cdEstudio!: string;
    private _cdEndereco!: string;
    private _nmEstudio!: string;

    public get cdEstudio(): string {
        return this._cdEstudio;
    }

    public set cdEstudio(cdEstudio: string) {
        this._cdEstudio = cdEstudio;
    }

    public get cdEndereco(): string {
        return this._cdEndereco;
    }

    public set cdEndereco(cdEndereco: string) {
        this._cdEndereco = cdEndereco;
    }

    public get nmEstudio(): string {
        return this._nmEstudio;
    }

    public set nmEstudio(nmEstudio: string) {
        this._nmEstudio = nmEstudio;
    }

    public static fromPostgresSql(res: any): Estudio {
        const estudio = new Estudio();

        estudio._cdEstudio = res.cd_estudio;
        estudio._cdEndereco = res.cd_endereco;
        estudio._nmEstudio = res.nm_estudio;

        return estudio;
    }

    public static fromMongoDb(res: IEstudio): Estudio {
        const estudio = new Estudio();

        estudio._cdEstudio = res._id.toString();
        estudio._cdEndereco = res.cdEndereco.toString();
        estudio._nmEstudio = res.nmEstudio;

        return estudio;
    }
}

const estudioSchema = new mongoose.Schema({
    cdEndereco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Endereco',
        required: true,
    },
    nmEstudio: {
        type: 'string',
        required: true,
    },
});

export interface IEstudio extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    cdEndereco: mongoose.Types.ObjectId;
    nmEstudio: string;
}

export const EstudioModel = mongoose.model<IEstudio>('Estudio', estudioSchema);
