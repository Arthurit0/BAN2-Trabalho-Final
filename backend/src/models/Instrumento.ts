import _ from 'lodash';

export default class Instrumento {
    private _cdInstr!: number;
    private _cdEstudio!: number;
    private _nmInstr?: string;
    private _tipInstr?: string;
    private _nmMarca?: string;

    // constructor(
    //     cdInstr: number,
    //     cdEstudio: number,
    //     nmInstr?: string,
    //     tipInstr?: string,
    //     nmMarca?: string
    // ) {
    //     this._cdInstr = cdInstr;
    //     this._cdStudio = cdEstudio;
    //     this._nmInstr = nmInstr;
    //     this._tipInstr = tipInstr;
    //     this._nmMarca = nmMarca;
    // }

    public get cdInstr(): number {
        return this._cdInstr;
    }

    public set cdInstr(cdInstr: number) {
        this._cdInstr = cdInstr;
    }

    public get cdEstudio(): number {
        return this._cdEstudio;
    }

    public set cdEstudio(cdEstudio: number) {
        this._cdEstudio = cdEstudio;
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

    public equals(obj: Instrumento) {
        return _.isEqual(obj, this);
    }

    public static fromPostgresSql(res: any): Instrumento {
        const instrumento = new this();
        instrumento._cdInstr = res.cd_instr;
        instrumento._cdEstudio = res.cd_estudio;
        instrumento._nmInstr = res.nm_instr;
        instrumento._tipInstr = res.tip_instr;
        instrumento._nmMarca = res.nm_marca;
        return instrumento;
    }
}
