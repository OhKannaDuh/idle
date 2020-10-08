export default class Purse {
    constructor() {
        this.coins = 0;
    }

    addCoins(quantity) {
        this.coins += quantity;
    }

    getCoins() {
        return this.coins;
    }
}
