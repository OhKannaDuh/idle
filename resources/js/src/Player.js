import skills from "./skills"
import Toolbelt from "./Toolbelt";
import Inventory from "./Inventory";

export default class Player {
    constructor() {
        this.skills = skills;
        this.toolbelt = new Toolbelt();
        this.inventory = new Inventory();
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

    addItem(item) {
        this.inventory.addItem(item);
    }

    getTotalXp() {
        let xp = 0;
        for (let index in this.skills) {
            xp += this.skills[index].xp;
        }

        return xp;
    }
};
