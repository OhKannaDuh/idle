class Item {
    constructor(identifier, name, value, stackSize = 1, floorStackSize = 500, customOptions = []) {
        this.identifier = identifier;
        this.name = name;
        this.value = value;
        this.stackSize = stackSize;
        this.floorStackSize = floorStackSize;
        this.customOptions = customOptions;
    }

    getIdentifier() {
        return this.identifier;
    }

    getName() {
        return this.name;
    }

    getValue() {
        return this.value;
    }

    canStack() {
        return this.stackSize > 1;
    }

    getStackSize() {
        return this.stackSize;
    }

    getFloorStackSize() {
        return this.floorStackSize;
    }

    getSellPrice() {
        return Math.round(this.value / 4);
    }

    getCustomOptions() {
        return this.customOptions;
    }
}

let items = {
    coin: new Item("coin", "Coin", 1),
};

import logs from "./items/logs";
for (let index in logs) {
    let log = logs[index];
    items[log.identifier] = new Item(log.identifier, log.name, log.value, log.stackSize ?? 1, log.floorStackSize ?? 500);
}

import hatchets from "./items/hatchets";
for (let index in hatchets) {
    let hatchet = hatchets[index];
    items[hatchet.identifier] = new Item(hatchet.identifier, hatchet.name, hatchet.value, hatchet.stackSize ?? 1, hatchet.floorStackSize ?? 20, [
        {
            text: "Add To Toolbelt",
            action: function(item, index, player) {
                let toolbelt = player.getToolbelt();
                let hatchet = toolbelt.getHatchets()[item.getIdentifier()];
                let currentHatchet = toolbelt.getHatchet();
                if (currentHatchet.getBonus() >= hatchet.getBonus()) {
                    return;
                }

                toolbelt.setHatchet(hatchet);
                player.getInventory().items.splice(index, 1);
           }
        },
    ]);
}

export default items;
