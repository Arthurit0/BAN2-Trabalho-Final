import _ from 'lodash';

export default class Studio {
    private _cdStudio: number;
    private _cdEndereco: number;
    private _nmStudio?: string;

    constructor(cdStudio: number, cdEndereco: number, nmStudio?: string) {
        this._cdStudio = cdStudio;
        this._cdEndereco = cdEndereco;
        this._nmStudio = nmStudio;
    }

    public get cdStudio(): number {
        return this._cdStudio;
    }
}
