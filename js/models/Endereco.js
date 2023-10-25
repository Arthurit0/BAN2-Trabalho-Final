import _ from 'lodash';

export default class Endereco {
    #codEnd;
    #nmRua;
    #nrCasa;
    #nmBairro;
    #nmCidade;
    #nmEstado;
    #nmPais;
    #telefone;

    constructor(codEnd) {
        this.#codEnd = codEnd
    }

    constructor(codEnd, nmRua, nrCasa, nmBairro, nmCidade, nmEstado, nmPais, telefone) {
        this.#codEnd = codEnd
        this.#nmRua = nmRua
        this.#nrCasa = nrCasa
        this.#nmBairro = nmBairro
        this.#nmCidade = nmCidade
        this.#nmEstado = nmEstado
        this.#nmPais = nmPais
        this.#telefone = telefone
    }

    get codEnd() {
        return this.#codEnd
    }

    get nmRua() {
        return this.#nmRua
    }

    set nmRua(strNmRua) {
        this.#nmRua = strNmRua
    }

    get nrCasa() {
        return this.#nrCasa
    }

    set nrCasa(strNmCasa) {
        this.#nrCasa = strNmCasa
    }

    get nmBairro() {
        return this.#nmBairro
    }

    set nmBairro(strNmBairro) {
        this.#nmBairro = strNmBairro
    }

    get nmCidade() {
        return this.#nmCidade
    }

    set nmCidade(strNmCidade) {
        return
    }


    equals(obj) {
        return _.isEqual(obj, this)
    }
}