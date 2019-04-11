class HttpService {


    _handleErrors(res) {
        if (res.ok) {
            return res;
        } else {
            throw new Error(res.statusText);
        }
    }

    get(url) {

        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    // get(url) {
    //     return new Promise((resolve, reject) => {
    //         let xhr = new XMLHttpRequest();
    //         xhr.open('GET', url);
    //         xhr.onreadystatechange = () => {
    //             if (xhr.readyState == 4) {
    //                 if (xhr.status == 200) {
    //                     resolve(JSON.parse(xhr.responseText));
    //                 } else {
    //                     reject(xhr.responseText);

    //                 }
    //             }
    //         };
    //         xhr.send();

    //     });
    // }
}