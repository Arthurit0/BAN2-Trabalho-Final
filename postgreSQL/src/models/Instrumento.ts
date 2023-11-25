import _ from 'lodash';

export default class Instrumento {
    private _cdInstrumento!: number;
    private _cdEstudio!: number;
    private _nmInstrumento?: string;
    private _tipoInstrumento?: string;
    private _nmMarca?: string;

    public get cdInstrumento(): number {
        return this._cdInstrumento;
    }

    public set cdInstrumento(cdInstrumento: number) {
        this._cdInstrumento = cdInstrumento;
    }

    public get cdEstudio(): number {
        return this._cdEstudio;
    }

    public set cdEstudio(cdEstudio: number) {
        this._cdEstudio = cdEstudio;
    }

    public get nmInstrumento(): string | undefined {
        return this._nmInstrumento;
    }

    public set nmInstrumento(nmInstr: string | undefined) {
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
}
