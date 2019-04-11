const stores = ['negociacao'];
const dbName = 'aluraframe'
const dbVersion = 1;

let connection = null;
let close = null;

export class ConnectionFactory {

    constructor() {
        throw new Error('STOP!');
    }

    static getConnection() {


        return new Promise((resolve, reject) => {
            let connection;

            let openRequest = window.indexedDB.open(dbName, dbVersion);

            openRequest.onupgradeneeded = e => {
                // console.log('Cria ou altera um banco existente');
                ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {
                // console.log('Conexão obtida com sucesso');
                if (!connection) {
                    connection = e.target.result
                    close = connection.close.bind(connection);
                    connection.close = () => {
                        throw new Error('STOP');
                    }
                }
                // result = IDBDatabase connection
                resolve(connection);
            };

            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }


    static closeConnection() {
        if (connection) {
            close();
            connection = null;
        }
    }


    static _createStores(connection) {

        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store, { autoIncrement: true });
        });

    }
}