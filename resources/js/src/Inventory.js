import Logger from "./Logger"

export default class Inventory {
    constructor() {
        this.items = [];
        this.limit = 28;
        this.floor = null;

        this.logger = new Logger();
    }

    clear() {
        this.items = [];
    }

    setFloor(floor) {
        this.floor = floor;
    }

    getItems() {
        return this.items;
    }

    isFull() {
        return this.items.length >= this.limit;
    }

    getRemainingSpace() {
        return this.limit - this.items.length;
    }

    hasItem(identifier) {
        return this.getIndexOfItem(identifier) !== -1;
    }

    getIndexOfItem(identifier) {
        for (let index in this.items) {
            let item = this.items[index];
            if (item.item.getIdentifier() === identifier && item.quantity < item.item.getStackSize()) {
                return index;
            }
        }

        return -1;
    }

    addItem(item, quantity = 1, log = true) {
        if (this.isFull()) {
            this.floor.addItem(item, quantity);
            return;
        }
        if (item.canStack()) {
            let index = this.getIndexOfItem(item.getIdentifier());
            let hasStack = index !== -1;
            if (hasStack) {
                let stack = this.items[index];
                let neededToFill = item.getStackSize() - stack.quantity;
                if (quantity > neededToFill) {
                    quantity -= neededToFill;
                    stack.quantity += neededToFill;
                } else {
                    stack.quantity += quantity;
                    return;
                }
            }

            if (quantity <= 0) {
                return;
            }

            while(quantity > item.getStackSize()) {
                this.addNewItem(item, item.getStackSize());
                quantity -= item.getStackSize();
            }

            this.addNewItem(item, quantity);
            return;
        }

        for (let x = 0; x < quantity; x++) {
            this.addNewItem(item, 1);
        }
    }

    addNewItem(item, quantity) {
        if (this.isFull()) {
            this.floor.addItem(item, quantity);
            return;
        }

        this.items.push({
            item: item,
            quantity: quantity,
        });
    }
};
