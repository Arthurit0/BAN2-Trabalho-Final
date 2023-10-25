import _ from 'lodash';

export class Autor {
    private _cdAutor: number;

    constructor(cdAutor: number) {
        this._cdAutor = cdAutor;
    }

    public get cdAutor() {
        return this._cdAutor;
    }

    equal(obj: Autor) {
        return _.isEqual(obj, this);
    }
}

export class Musico extends Autor {
    private _nrReg: number;
    private _cdEnd?: number;
    private _nmMusico?: string;
    private _nmArtistico?: string;

    constructor(
        cdAutor: number,
        nrReg: number,
        cdEnd?: number,
        nmMusico?: string,
        nmArtistico?: string
    ) {
        super(cdAutor);
        this._nrReg = nrReg;
        this._cdEnd = cdEnd;
        this._nmMusico = nmMusico;
        this._nmArtistico = nmArtistico;
    }

    public get nrReg() {
        return this._nrReg;
    }

    public get cdEnd(): number | undefined {
        return this._cdEnd;
    }

    public set cdEnd(cdEnd: number) {
        this._cdEnd = cdEnd;
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

    equal(obj: Musico): boolean {
        return _.isEqual(obj, this);
    }
}

export class Banda extends Autor {
    private _cdBanda: number;
    private _nmBanda?: string;
    private _dtFormacao?: Date;

    constructor(cdAutor: number, cdBanda: number, nmBanda?: string, dtFormacao?: Date) {
        super(cdAutor);
        this._cdBanda = cdBanda;
        this._nmBanda = nmBanda;
        this._dtFormacao = dtFormacao;
    }

    public get cdBanda(): number {
        return this._cdBanda;
    }

    public get nmBanda(): string | undefined {
        return this._nmBanda;
    }

    public set nmBanda(nmBanda: string) {
        this._nmBanda = nmBanda;
    }

    public get dtFormacao(): Date | undefined {
        return this._dtFormacao;
    }

    public set dtFormacao(dtFormacao: Date) {
        this._dtFormacao = dtFormacao;
    }

    public equal(obj: Banda): boolean {
        return _.isEqual(obj, this);
    }
}
