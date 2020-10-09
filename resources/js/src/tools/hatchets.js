class Hatchet {
    constructor(item, bonus, level = 1) {
        this.item = item;
        this.bonus = bonus;
        this.level = level;
    }

    getItem() {
        return this.item;;
    }

    getBonus() {
        return this.bonus;
    }
};

let data = {};

import hatchets from "../items/hatchets";
for (let index in hatchets) {
    let hatchet = hatchets[index];
    data[hatchet.identifier] = new Hatchet(window.items[hatchet.identifier], hatchet.bonus, hatchet.level);
}

export default data;
