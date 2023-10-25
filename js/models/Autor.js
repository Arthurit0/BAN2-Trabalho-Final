// @ts-check
import _ from 'lodash'

export class Autor {

    #codAutor;

    constructor(codAutor) {
        this.#codAutor = codAutor;
    }

    get codAutor() {
        return this.#codAutor
    }

    equal(obj) {
        return _.isEqual(obj, this)
    }
}

export class Musico extends Autor {
    #nrReg;
    #codEnd;
    #codAutor;
    #nomeArtistico;
    #nome;

    constructor(nrReg) {
        this.#nrReg = nrReg
    }

    constructor(nrReg, codEnd, nomeArtistico, nome) {
        this.#nrReg = nrReg;
        this.#codEnd = codEnd;
        this.#nomeArtistico = nomeArtistico;
        this.#nome = nome;
    }

    get nrReg() {
        return this.#nrReg
    }

    get codEnd() {
        return this.#codEnd
    }

    get codAutor() {
        return this.#codAutor
    }

    get nomeArtistico() {
        return this.#nomeArtistico
    }

    set nomeArtistico(strNomeArtistico) {
        this.#nomeArtistico = strNomeArtistico
    }

    get nome() {
        return this.#nome;
    }

    set nome(strNome) {
        this.#nome = strNome
    }

    equal(obj) {
        return _.isEqual(obj, this)
    }
}

export class Banda extends Autor {
    #codBanda;
    #nmBanda;
    #dtFormacao;

    constructor(codBanda) {
        this.#codBanda = codBanda;
    }

    constructor(codBanda, nmBanda, dtFormacao) {
        this.#codBanda = codBanda;
        this.#nmBanda = nmBanda;
        this.#dtFormacao = dtFormacao;
    }

    get codBanda() {
        return this.#codBanda;
    }

    get nmBanda() {
        return this.#nmBanda;
    }

    set nmBanda(strNmBanda) {
        this.#nmBanda = strNmBanda
    }

    get dtFormacao() {
        return this.#dtFormacao
    }

    set dtFormacao(strDtFormacao) {
        this.#dtFormacao = strDtFormacao
    }

    equal(obj) {
        return _.isEqual(obj, this)
    }
}