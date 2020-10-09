export default class Shop {
    constructor(name, stock = []) {
        this.name = name;
        this.stock = stock;
    }

    getName() {
        return this.name;
    }

    getStock() {
        return this.stock;
    }
};
