import skills from "./skills"
import Inventory from "./Inventory";
import Purse from "./Purse";
import Toolbelt from "./Toolbelt";

export default class Player {
    constructor() {
        this.skills = skills;
        this.inventory = new Inventory();
        this.purse = new Purse();
        this.toolbelt = new Toolbelt();
    }

    setFloor(floor) {
        this.inventory.setFloor(floor);
    }

    getSkills() {
        return this.skills;
    }

    getSkill(skillIdentifier) {
        return this.skills[skillIdentifier];
    }

    getLevel(skillIdentifier) {
        return this.skills[skillIdentifier].getLevel();
    }

    addXp(skillIdentifier, xp) {
        this.skills[skillIdentifier].addXp(xp);
    }

    getToolbelt() {
        return this.toolbelt;
    }

    getInventory() {
        return this.inventory;
    }

    addItem(item, quantity=1) {
        if (item.getIdentifier() === "coin") {
            this.purse.addCoins(quantity);
            return;
        }

        this.inventory.addItem(item, quantity);
    }

    addCoins(quantity) {
        this.addItem(window.items.coin, quantity);
    }

    getTotalXp() {
        let xp = 0;
        for (let index in this.skills) {
            xp += this.skills[index].xp;
        }

        return xp;
    }

    getTotalLevel() {
        let level = 0;
        for (let index in this.skills) {
            level += this.skills[index].level;
        }

        return level;
    }

    getMaxedSkills() {
        let skills = 0;
        for (let index in this.skills) {
            if (this.skills[index].level >= 99) {
                skills++;
            }
        }

        return skills;
    }

    getPurse() {
        return this.purse;
    }

    bankAll(bank) {
        let items = this.inventory.getItems();
        for (let index in items) {
            bank.addItem(items[index].item, items[index].quantity);
        }

        this.inventory.clear();
    }

    bankItem(item, bank) {
        bank.addItem(item.item, item.quantity);
    }
};
