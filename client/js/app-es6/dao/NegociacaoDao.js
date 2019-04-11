class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacao';
    }


    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {
                console.log('Negociacao incluida com sucesso');
                resolve();
            }

            request.onerror = e => {
                console.log(`Não foi possivel adicionar. Erro: ${e.target.error.name}`);
                reject(e.target.error.name);
            }
        });

    }

    listaTodos() {
        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readonly')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];
            // 
            cursor.onsuccess = e => {
                let atual = e.target.result;
                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            };

            cursor.onerror = e => {
                console.log(`Não foi possivel listar todos. Erro: ${e.target.error.name}`);
                reject(e.target.error.name);
            };

        });
    }


    apagaTodos() {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Negociações apagadas com sucesso!');

            request.onerror = e => {
                console.log(`Não foi possivel apagar todos. Erro: ${e.target.error.name}`);
                reject(e.target.error.name);
            };

        });
    }
}