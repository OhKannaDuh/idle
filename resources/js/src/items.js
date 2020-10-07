class Item {
    constructor(identifier, name, value, stackSize = 1) {
        this.identifier = identifier;
        this.name = name;
        this.value = value;
        this.stackSize = stackSize;
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
}

export default {
    coin: new Item("coin", "Coin", 1),
    log: new Item("log", "Log", 4),
    oakLog: new Item("oakLog", "Oak Log", 20),
};
