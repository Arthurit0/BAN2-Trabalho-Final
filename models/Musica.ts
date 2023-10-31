import _ from 'lodash';

export default class Musica {
    private _cdMusica: number;
    private _ds_titulo: string;
    private _tpDuracao?: number;
    private _fmtArquivo?: string;

    constructor(cdMusica: number, ds_titulo: string, tpDuracao?: number, fmtArquivo?: string) {
        this._cdMusica = cdMusica;
        this._ds_titulo = ds_titulo;
        this._tpDuracao = tpDuracao;
        this._fmtArquivo = fmtArquivo;
    }

    public get cdMusica() {
        return this._cdMusica;
    }

    public get ds_titulo() {
        return this._ds_titulo;
    }

    public set ds_titulo(ds_titulo: string) {
        this._ds_titulo = ds_titulo;
    }

    public get tpDuracao(): number | undefined {
        return this._tpDuracao;
    }

    public set tpDuracao(tpDuracao: number) {
        this._tpDuracao = tpDuracao;
    }

    public get fmtArquivo(): string | undefined {
        return this._fmtArquivo;
    }

    public set fmtArquivo(fmtArquivo: string) {
        this._fmtArquivo = fmtArquivo;
    }

    public equal(obj: Musica): boolean {
        return _.isEqual(obj, this);
    }
}
