class NegociacaoService {

    constructor() {
        this._httpService = new HttpService();
    }

    _obterNegociacoes() {
        return this._httpService.get('negociacoes/semana')
            .then(negociacoes =>
                negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });
    }


    cadastra(negociacao) {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso!')
            .catch((erro) => {
                console.log(erro);
                throw new Error('Não foi possivel adicionar a negociação!')
            });
    }

    lista() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch((erro) => {
                console.log(erro);
                throw new Error('Não foi possivel obter as negociações!')
            });
    }


    apaga() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociação apagadas com sucesso!')
            .catch((erro) => {
                console.log(erro);
                throw new Error('Não foi possivel apagar as negociações!')
            });
    }


    importa(listaAtual) {
        return this._obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)))
            )
            .then(negociacoes => negociacoes)
            .catch((erro) => {
                console.log(erro);
                throw new Error('Não foi possivel importar as negociações!')
            });
    }

}