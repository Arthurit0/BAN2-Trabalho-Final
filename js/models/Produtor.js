import _ from 'lodash'

export default class Produtor {
    #codProd;
    #codEnd;
    #nome;
    #nmEmpresa;

    constructor(codProd) {
        this.#codProd = codProd
    }

    constructor(codProd, codEnd, nome, nmEmpresa) {
        this.#codProd = codProd
        this.#codEnd = codEnd
        this.#nome = nome
        this.#nmEmpresa = nmEmpresa
    }

    get codProd() {
        return this.#codProd
    }

    get codEnd() {
        return this.#codEnd
    }

    set codEnd(strCodEnd) {
        this.#codEnd = strCodEnd
    }

    get nome() {
        return this.#nome
    }

    set nome(strNome) {
        this.#nome = strNome
    }

    get nmEmpresa() {
        return this.#nmEmpresa
    }

    set nmEmpresa(strNmEmpresa) {
        this.#nmEmpresa = strNmEmpresa
    }

    equal(obj) {
        return _.isEqual(obj, this)
    }

}