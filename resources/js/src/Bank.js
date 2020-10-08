export default class Bank {
    constructor() {
        this.items = [];

        this.addItem(window.items.yewLogs, 209);
        this.addItem(window.items.oakLogs, 435);
        this.addItem(window.items.magicLogs, 2345234);
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
            return;
        }

        this.items.push({
            item: item,
            quantity: quantity,
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

        let canHold = item.getStackSize() * inventory.getRemainingSpace();
        let inventoryIndex = inventory.getIndexOfItem(item);
        if (inventoryIndex !== -1) {
            canHold += inventory.getItems[inventoryIndex].quantity;
        }

        let take = Math.min(quantity, canHold);

        // Subtract from stack
        this.items[index].quantity -= take;

        // If stack is now empty remove it from the array
        if (this.items[index].quantity <= 0) {
            this.items.splice(index, 1);
        }

        player.addItem(item, take);
    }
}
