import _ from 'lodash';

export default class Endereco {
    private _cdEndereco!: number;
    private _nmRua?: string;
    private _nrCasa?: number;
    private _nmBairro?: string;
    private _nmCidade?: string;
    private _nmEstado?: string;
    private _nmPais?: string;
    private _dsTelefone?: string;

    public get cdEndereco(): number {
        return this._cdEndereco;
    }

    public set cdEndereco(cdEndereco: number) {
        this._cdEndereco = cdEndereco;
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

    public static fromPostgresSql(res: any): Endereco {
        const endereco = new this();
        endereco._cdEndereco = res.cd_endereco;
        endereco._nmRua = res.nm_rua;
        endereco._nrCasa = res.nr_casa;
        endereco._nmBairro = res.nm_bairro;
        endereco._nmCidade = res.nm_cidade;
        endereco._nmEstado = res.nm_estado;
        endereco._nmPais = res.nm_pais;
        endereco._dsTelefone = res.ds_telefone;

        return endereco;
    }
}
