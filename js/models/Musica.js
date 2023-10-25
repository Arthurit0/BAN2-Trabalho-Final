import _ from 'lodash'

export default class Musica {
    #codMusica;
    #titulo;
    #duracao;
    #fmArquivo;

    constructor(codMusica) {
        this.#codMusica = codMusica
    }

    constructor(codMusica, titulo, duracao, fmArquivo) {
        this.#codMusica = codMusica
        this.#titulo = titulo
        this.#duracao = duracao
        this.#fmArquivo = fmArquivo
    }

    get codMusica() {
        return this.#codMusica
    }

    get titulo() {
        return this.#titulo
    }

    set titulo(strTitulo) {
        this.#titulo = strTitulo
    }

    get duracao() {
        return this.#duracao
    }

    set duracao(strDuracao) {
        this.#duracao = strDuracao
    }

    get fmArquivo() {
        return this.#fmArquivo
    }

    set fmArquivo(strFmArquivo) {
        this.#fmArquivo = strFmArquivo
    }

    equal(obj) {
        return _.isEqual(obj, this)
    }
}   