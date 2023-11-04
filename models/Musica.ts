import _ from 'lodash';

export default class Musica {
    private _cdMusica!: number;
    private _dsTitulo!: string;
    private _tpDuracao?: number;
    private _fmtArquivo?: string;

    // constructor(cdMusica: number, dsTitulo: string, tpDuracao?: number, fmtArquivo?: string) {
    //     this._cdMusica = cdMusica;
    //     this._dsTitulo = dsTitulo;
    //     this._tpDuracao = tpDuracao;
    //     this._fmtArquivo = fmtArquivo;
    // }

    public get cdMusica(): number {
        return this._cdMusica;
    }

    public set cdMusica(cdMusica: number) {
        this._cdMusica = cdMusica;
    }

    public get dsTitulo(): string {
        return this._dsTitulo;
    }

    public set dsTitulo(dsTitulo: string) {
        this._dsTitulo = dsTitulo;
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
