class ProxyFactory {

    static create(model, props, acao) {

        return new Proxy(model, {
            // é um get pois vai pegar o nome do metodo
            //O target é o objeto real, que é encapsulado pelo proxy.
            //O prop é a propriedade que está sendo lida.
            //O receiver é uma referência ao próprio proxy.
            get(target, prop, receiver) {
                if (props.includes(prop) && typeof (target[prop]) == typeof (Function)) {
                    return function () {
                        // console.log(`método '${prop}' interceptado`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {

                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    // console.log(`Propriedade '${prop}' interceptada. Valor': '${value}'`);
                    acao(target);
                }
                return retorno;

            }
        });
    }

}