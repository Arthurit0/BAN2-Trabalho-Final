import _ from 'lodash';

export default class Musica {
    private _cdMusica!: number;
    private _dsTitulo!: string;
    private _dsGenero?: string;
    private _tpDuracao?: number;
    private _fmtArquivo?: string;

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

    public get dsGenero(): string | undefined {
        return this._dsGenero;
    }

    public set dsGenero(dsGenero: string) {
        this._dsGenero = dsGenero;
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

    public equals(obj: Musica): boolean {
        return _.isEqual(obj, this);
    }

    public static fromPostgresSql(res: any): Musica {
        const musica = new this();
        musica._cdMusica = res.cd_musica;
        musica._dsTitulo = res.ds_titulo;
        musica._dsGenero = res.ds_genero;
        musica._tpDuracao = res.tp_duracao;
        musica._fmtArquivo = res.fmt_arquivo;
        return musica;
    }
}
