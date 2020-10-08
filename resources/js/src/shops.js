class Shop {
    constructor() {
        this.items = {};
    }

    addItem(item, stock) {
        this.items[item.getIdentifier()] = {
            item: item,
            stock: stock,
        };
    }
};
