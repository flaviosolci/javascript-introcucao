/** 
 * Classe controller for all Negociacao
 * 
 * @author Flavio
 * @since 0.0.1
 */
class NegociacaoController {


    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia');


        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
    }

    /**
     * Adiciona uma negociacao
     * 
     * @param  event
     *  Evento
     */
    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegocicao());
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociacoes apagadas!';
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        Promise.all([service.obterNegociacoesDaSemana(),
        service.obterNegociacoesDaSemana()]).
            then(negociacoes => {
                negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), []).
                    forEach(negociacao => {
                        this._listaNegociacoes.adiciona(negociacao);
                    });
                this._mensagem.texto = 'Negociações importadas com sucesso!'
            }).catch(erro => this._mensagem.texto = erro);

    }

    _criaNegocicao() {
        return new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();

    }





}


  // ARROW FUNCTION 'this'é lexico, mantem o scopo
        // funcao normal, é dinamico, pega o contexto de onde foi usado
        // this._listaNegociaoes = new ListaNegociacoes(model => this._negocicoesView.update(model));

        // usando proxy. Intercepta o metodo adiciona e esvazia,manda executar o resto dfo metodo e no final executa o update da view 
        // Metodos em javascript também são gets. Primeiro chama-se a classe com um get para pegar o nome do metodo e depois da o Apply
        // this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
        //     // é um get pois vai pegar o nome do metodo
        //     //O target é o objeto real, que é encapsulado pelo proxy.
        //     //O prop é a propriedade que está sendo lida.
        //     //O receiver é uma referência ao próprio proxy.
        //     get(target, prop, receiver) {
        //         if (['adiciona', 'esvazia'].includes(prop) && typeof (target[prop]) == typeof (Function)) {
        //             return function () {
        //                 console.log(`método '${prop}' interceptado`);
        //                 Reflect.apply(target[prop], target, arguments);
        //                 this._negociacoesView.update(target);
        //             }
        //         }
        //         return Reflect.get(target, prop, receiver);
        //     }
        // });

        // this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ['adiciona', 'esvazia'], (model) => this._negocicoesView.update(model));
        // this._mensagem = ProxyFactory.create(new Mensagem(), ['texto'], (model) => this._mensagemView.update(model));