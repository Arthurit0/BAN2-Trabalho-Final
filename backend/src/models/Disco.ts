import _ from 'lodash';

export default class Disco {
    private _cdDisco!: number;
    private _cdAutor!: number;
    private _cdProdutor!: number;
    private _cdLocalGravacao?: number;
    private _dtGrav?: Date;
    private _fmtGrav?: string;
    private _dsTitulo?: string;

    // constructor(
    //     cdDisco: number,
    //     cdAutor: number,
    //     cdProdutor: number,
    //     cdLocalGravacao?: number,
    //     dtGrav?: Date,
    //     fmtGrav?: string,
    //     dsTitulo?: string
    // ) {
    //     this._cdDisco = cdDisco;
    //     this._cdAutor = cdAutor;
    //     this._cdProdutor = cdProdutor;
    //     this._cdLocalGravacao = cdLocalGravacao;
    //     this._dtGrav = dtGrav;
    //     this._fmtGrav = fmtGrav;
    //     this._dsTitulo = dsTitulo;
    // }

    public get cdDisco(): number {
        return this._cdDisco;
    }

    public get cdAutor(): number {
        return this._cdAutor;
    }

    public set cdAutor(cdAutor: number) {
        this._cdAutor = cdAutor;
    }

    public get cdProdutor(): number {
        return this._cdProdutor;
    }

    public set cdProdutor(cdProdutor: number) {
        this._cdProdutor = cdProdutor;
    }

    public get cdLocalGravacao(): number | undefined {
        return this._cdLocalGravacao;
    }

    public set cdLocalGravacao(cdLocalGravacao: number) {
        this._cdLocalGravacao = cdLocalGravacao;
    }

    public get dtGrav(): Date | undefined {
        return this._dtGrav;
    }

    public set dtGrav(dtGrav: Date) {
        this._dtGrav = dtGrav;
    }

    public get dsTitulo(): string | undefined {
        return this._dsTitulo;
    }

    public set dsTitulo(dsTitulo: string) {
        this._dsTitulo = dsTitulo;
    }

    public get fmtGrav(): string | undefined {
        return this._fmtGrav;
    }

    public set fmtGrav(fmtGrav: string) {
        this._fmtGrav = fmtGrav;
    }

    public equals(obj: Disco) {
        return _.isEqual(obj, this);
    }

    public static fromPostgresSql(res: any): Disco {
        const disco = new this();
        disco._cdAutor = res.cd_autor;
        disco._cdProdutor = res.cd_produtor;
        disco._cdLocalGravacao = res.cd_local_gravacao;
        disco._dtGrav = res.dt_grav;
        disco._fmtGrav = res.fmt_grav;
        disco._dsTitulo = res.ds_titulo;
        return disco;
    }
}
