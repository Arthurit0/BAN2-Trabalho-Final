import _ from 'lodash';
import moment from 'moment';

export class Autor {
    private _cdAutor!: number;

    constructor(cdAutor: number) {
        this._cdAutor = cdAutor;
    }

    public set cdAutor(cdAutor: number) {
        this._cdAutor = cdAutor;
    }

    public get cdAutor() {
        return this._cdAutor;
    }

    public equals(obj: Autor) {
        return _.isEqual(obj, this);
    }
}

export class Musico extends Autor {
    private _nrReg!: number;
    private _cdEndereco?: number;
    private _nmMusico!: string;
    private _nmArtistico?: string;

    public set nrReg(nrReg: number) {
        this._nrReg = nrReg;
    }

    public get nrReg(): number {
        return this._nrReg;
    }

    public get cdEndereco(): number | undefined {
        return this._cdEndereco;
    }

    public set cdEndereco(cdEndereco: number) {
        this._cdEndereco = cdEndereco;
    }

    public get nmMusico(): string | undefined {
        return this._nmMusico;
    }

    public set nmMusico(nmMusico: string) {
        this._nmMusico = nmMusico;
    }

    public get nmArtistico(): string | undefined {
        return this._nmArtistico;
    }

    public set nmArtistico(strNmArtistico: string) {
        this._nmArtistico = strNmArtistico;
    }

    public equals(obj: Musico): boolean {
        return _.isEqual(obj, this);
    }

    public static fromPostgresSql(res: any): Musico {
        const musico = new Musico(res.cd_autor);
        musico._nrReg = res.nr_reg;
        musico._cdEndereco = res.cd_endereco;
        musico._nmMusico = res.nm_musico;
        musico._nmArtistico = res.nm_artistico;
        return musico;
    }
}

export class Banda extends Autor {
    private _cdBanda!: number;
    private _nmBanda?: string;
    private _dtFormacao?: Date | string;

    public get cdBanda(): number {
        return this._cdBanda;
    }

    public set cdBanda(cdBanda: number) {
        this._cdBanda = cdBanda;
    }

    public get nmBanda(): string | undefined {
        return this._nmBanda;
    }

    public set nmBanda(nmBanda: string) {
        this._nmBanda = nmBanda;
    }

    public get dtFormacao(): Date | string | undefined {
        return this._dtFormacao;
    }

    public set dtFormacao(dtFormacao: Date | string) {
        this._dtFormacao = dtFormacao;
    }

    public static fromPostgresSql(res: any): Banda {
        let banda = new this(res.cd_autor);
        banda._cdBanda = res.cd_banda;
        banda._nmBanda = res.nm_banda;
        banda._dtFormacao = moment(res.dt_formacao).format('DD/MM/YYYY');
        return banda;
    }
}
