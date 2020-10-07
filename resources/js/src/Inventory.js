import Logger from "./Logger"

export default class Inventory {
    constructor() {
        this.items = [];
        this.limit = 28;

        this.logger = new Logger();
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
            return;
        }

        this.items.push({
            item: item,
            quantity: quantity,
        });
    }

    saddItem(item, quantity = 5, log = true) {
        if (item.canStack()) {
            let index = this.getIndexOfItem(item.getIdentifier());
            if (index !== -1) {
                if (log) {
                    this.logger.blue(`Otained ${quantity} ${item.getName()}(s)`);
                }

                this.items[index].quantity += quantity;
                let max = item.getStackSize();
                if (this.items[index].quantity > max) {
                    let diff = this.items[index].quantity - max;
                    this.items[index].quantity = max;
                    this.addItem(item, diff, false);
                }

                return true;
            }

            if (quantity > item.getStackSize()) {
                while (quantity > 0) {
                    if (quantity > item.getStackSize()) {
                        this.addItem(item, item.getStackSize(), false);
                        quantity -= item.getStackSize();
                        continue;
                    }

                    this.addItem(item, quantity, false);
                }

                return true;
            }

            this.addItem(item, quantity, false);
            return;
        }

        if (this.isFull()) {
            this.logger.red("Inventory full!");
            return false;
        }

        if (quantity > 1) {
            for (let x = 1; x < quantity; x++) {
                if (!this.addItem(item, 1, false)) {
                    return true;
                }
            }
        }

        if (log) {
            this.logger.blue(`Otained ${quantity} ${item.getName()}(s)`);
        }

        this.items.push({
            item: item,
            quantity: quantity,
        });

        return true;
    }
};
