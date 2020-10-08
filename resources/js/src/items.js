class Item {
    constructor(identifier, name, value, stackSize = 1, floorStackSize = 500) {
        this.identifier = identifier;
        this.name = name;
        this.value = value;
        this.stackSize = stackSize;
        this.floorStackSize = floorStackSize;
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
}

let items = {
    coin: new Item("coin", "Coin", 1),
};

import logs from "./items/logs";
for (let index in logs) {
    let log = logs[index];
    items[log.identifier] = new Item(log.identifier, log.name, log.value, log.stackSize ?? 1, log.floorStackSize ?? 500);
}

export default items;

// export default {
//     coin: new Item("coin", "Coin", 1),
//     log: new Item("log", "Log", 4),
//     oakLog: new Item("oakLog", "Oak Log", 20),
// };
