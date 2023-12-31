import _ from 'lodash';

export default class Estudio {
    private _cdEstudio!: number;
    private _cdEndereco?: number;
    private _nmEstudio?: string;

    public get cdEstudio(): number {
        return this._cdEstudio;
    }

    public set cdEstudio(cdEstudio: number) {
        this._cdEstudio = cdEstudio;
    }

    public get cdEndereco(): number | undefined {
        return this._cdEndereco;
    }

    public set cdEndereco(cdEndereco: number | undefined) {
        this._cdEndereco = cdEndereco;
    }

    public get nmEstudio(): string | undefined {
        return this._nmEstudio;
    }

    public set nmEstudio(nmEstudio: string | undefined) {
        this._nmEstudio = nmEstudio;
    }

    public static fromPostgresSql(res: any): Estudio {
        const estudio = new Estudio();
        estudio._cdEstudio = res.cd_estudio;
        estudio._cdEndereco = res.cd_endereco;
        estudio._nmEstudio = res.nm_estudio;
        return estudio;
    }
}
