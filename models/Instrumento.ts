import _ from 'lodash';

export default class Instrumento {
    private _cdInstr: number;
    private _cdStudio: number;
    private _nmInstr?: string;
    private _tipInstr?: string;
    private _nmMarca?: string;

    constructor(
        cdInstr: number,
        cdStudio: number,
        nmInstr?: string,
        tipInstr?: string,
        nmMarca?: string
    ) {
        this._cdInstr = cdInstr;
        this._cdStudio = cdStudio;
        this._nmInstr = nmInstr;
        this._tipInstr = tipInstr;
        this._nmMarca = nmMarca;
    }

    public get cdInstr(): number {
        return this._cdInstr;
    }

    public get cdStudio(): number {
        return this._cdStudio;
    }

    public set cdStudio(cdStudio: number) {
        this._cdStudio = cdStudio;
    }

    public get nmInstr(): string | undefined {
        return this._nmInstr;
    }

    public set nmInstr(nmInstr: string | undefined) {
        this.nmInstr = nmInstr;
    }

    public get tipInstr(): string | undefined {
        return this._tipInstr;
    }

    public set tipInstr(tipInstr: string | undefined) {
        this._tipInstr = tipInstr;
    }

    public get nmMarca(): string | undefined {
        return this._nmMarca;
    }

    public set nmMarca(nmMarca: string | undefined) {
        this._nmMarca = nmMarca;
    }

    public equal(obj: Instrumento) {
        return _.isEqual(obj, this);
    }
}
