import _ from 'lodash';
import moment from 'moment';

export default class Disco {
    private _cdDisco!: number;
    private _cdAutor!: number;
    private _cdLocalGravacao?: number;
    private _dtGravacao?: Date | string;
    private _dsTitulo?: string;

    // constructor(
    //     cdDisco: number,
    //     cdAutor: number,
    //     cdLocalGravacao?: number,
    //     dtGrav?: Date,
    //     fmtGrav?: string,
    //     dsTitulo?: string
    // ) {
    //     this._cdDisco = cdDisco;
    //     this._cdAutor = cdAutor;
    //     this._cdLocalGravacao = cdLocalGravacao;
    //     this._dtGravacao = dtGrav;
    //     this._dsTitulo = dsTitulo;
    // }

    public get cdDisco(): number {
        return this._cdDisco;
    }

    public set cdDisco(cdDisco: number) {
        this._cdDisco = cdDisco;
    }

    public get cdAutor(): number {
        return this._cdAutor;
    }

    public set cdAutor(cdAutor: number) {
        this._cdAutor = cdAutor;
    }

    public get cdLocalGravacao(): number | undefined {
        return this._cdLocalGravacao;
    }

    public set cdLocalGravacao(cdLocalGravacao: number) {
        this._cdLocalGravacao = cdLocalGravacao;
    }

    public get dtGravacao(): Date | string | undefined {
        return this._dtGravacao;
    }

    public set dtGravacao(dtGrav: Date | string) {
        this._dtGravacao = dtGrav;
    }

    public get dsTitulo(): string | undefined {
        return this._dsTitulo;
    }

    public set dsTitulo(dsTitulo: string) {
        this._dsTitulo = dsTitulo;
    }

    public equals(obj: Disco) {
        return _.isEqual(obj, this);
    }

    public static fromPostgresSql(res: any): Disco {
        const disco = new this();
        disco._cdDisco = res.cd_disco;
        disco._cdAutor = res.cd_autor;
        disco._cdLocalGravacao = res.cd_local_gravacao;
        disco._dtGravacao = moment(res.dt_gravacao).format('DD/MM/YYYY');
        disco._dsTitulo = res.ds_titulo;
        return disco;
    }
}
