export default class Purse {
    constructor() {
        this.coins = 500;
    }

    addCoins(quantity) {
        this.coins += quantity;
    }

    getCoins() {
        return this.coins;
    }

    takeCoins(quantity) {
        this.coins = Math.max(0, this.coins -= quantity);
    }
}
