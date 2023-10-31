import _ from 'lodash';

export default class Studio {
    private _cdStudio: number;
    private _cdEndereco?: number;
    private _nmStudio?: string;

    constructor(cdStudio: number, cdEndereco: number, nmStudio?: string) {
        this._cdStudio = cdStudio;
        this._cdEndereco = cdEndereco;
        this._nmStudio = nmStudio;
    }

    public get cdStudio(): number {
        return this._cdStudio;
    }

    public get cdEndereco(): number | undefined {
        return this._cdEndereco;
    }

    public set cdEndereco(cdEndereco: number | undefined) {
        this._cdEndereco = cdEndereco;
    }

    public get nmStudio(): string | undefined {
        return this._nmStudio;
    }

    public set nmStudio(nmStudio: string | undefined) {
        this._nmStudio = nmStudio;
    }

    public equal(obj: Studio) {
        return _.isEqual(obj, this);
    }
}
