import _ from 'lodash';

export default class Endereco {
    private _cdEnd: number;
    private _nmRua?: string;
    private _nrCasa?: number;
    private _nmBairro?: string;
    private _nmCidade?: string;
    private _nmEstado?: string;
    private _nmPais?: string;
    private _dsTelefone?: string;

    constructor(
        cdEnd: number,
        nmRua?: string,
        nrCasa?: number,
        nmBairro?: string,
        nmCidade?: string,
        nmEstado?: string,
        nmPais?: string,
        dsTelefone?: string
    ) {
        this._cdEnd = cdEnd;
        this._nmRua = nmRua;
        this._nrCasa = nrCasa;
        this._nmBairro = nmBairro;
        this._nmCidade = nmCidade;
        this._nmEstado = nmEstado;
        this._nmPais = nmPais;
        this._dsTelefone = dsTelefone;
    }

    public get cdEnd(): number {
        return this._cdEnd;
    }

    public get nmRua(): string | undefined {
        return this._nmRua;
    }

    public set nmRua(nmRua: string) {
        this._nmRua = nmRua;
    }

    public get nrCasa(): number | undefined {
        return this._nrCasa;
    }

    public set nrCasa(nmCasa: number) {
        this._nrCasa = nmCasa;
    }

    public get nmBairro(): string | undefined {
        return this._nmBairro;
    }

    public set nmBairro(nmBairro: string) {
        this._nmBairro = nmBairro;
    }

    public get nmCidade(): string | undefined {
        return this._nmCidade;
    }

    public set nmCidade(nmCidade: string) {
        this._nmCidade = nmCidade;
    }

    public get nmEstado(): string | undefined {
        return this._nmEstado;
    }

    public set nmEstado(nmEstado: string) {
        this._nmEstado = nmEstado;
    }

    public get nmPais(): string | undefined {
        return this._nmPais;
    }

    public set nmPais(nmPais: string) {
        this._nmPais = nmPais;
    }

    public get dsTelefone(): string | undefined {
        return this._dsTelefone;
    }

    public set dsTelefone(dsTelefone: string) {
        this._dsTelefone = dsTelefone;
    }

    public equal(obj: Endereco): boolean {
        return _.isEqual(obj, this);
    }
}
