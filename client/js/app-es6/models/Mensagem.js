class Mensagem {

    constructor(texto = '') {
        this._texto = texto;
    }

    get texto() {
        return this._texto;
    }

    /**
     * @param {string} texto
     */
    set texto(texto) {
        this._texto = texto;
    }

}