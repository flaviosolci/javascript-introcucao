export class DateHelper {

    constructor() {
        throw new Error('DateHelper não pode ser instanciado!');
    }

    static textToDate(text) {
        return new Date(text.split('-'))
    }

    static dateToText(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;

    }
}