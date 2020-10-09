export default class Floor {
    constructor() {
        this.items = [];
    }

    getItems() {
        return this.items;
    }

    getItemIndex(item) {
        for (let index in this.items) {
            if (this.items[index].item.getIdentifier() === item.getIdentifier()) {
                return index;
            }
        }

        return -1;
    }

    addItem(item, quantity) {
        let index = this.getItemIndex(item);
        if (index !== -1) {
            this.items[index].quantity += quantity;
            this.items[index].quantity = Math.min(this.items[index].quantity, item.getFloorStackSize());
            return;
        }

        this.items.push({
            item: item,
            quantity: Math.min(quantity, item.getFloorStackSize()),
        });

    }

    takeItem(item, quantity, player) {
        let inventory = player.getInventory();
        if (inventory.isFull()) {
            return;
        }

        let index = this.getItemIndex(item);
        // Ensure we don't take more than is available
        if (this.items[index].quantity < quantity) {
            quantity = this.items[index].quantity;
        }

        // Subtract from stack
        this.items[index].quantity -= quantity;

        // If stack is now empty remove it from the array
        if (this.items[index].quantity <= 0) {
            this.items.splice(index, 1);
        }

        inventory.addItem(item, quantity);
    }

    bankItem(index, bank) {
        let stack = this.items[index];
        bank.addItem(stack.item, stack.quantity);
        this.items.splice(index, 1);
    }
}
