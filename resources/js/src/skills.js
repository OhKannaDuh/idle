import ExperienceTable from "./ExperienceTable";
import Logger from "./Logger";

class Skill {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;

        this.xp = 0;
        this.level = 1;
        this.experienceTable = new ExperienceTable();
        this.logger = new Logger();
    }

    getName() {
        return this.name;
    }

    getIcon() {
        return this.icon;
    }

    addXp(xp) {
        this.logger.blue(`${xp} ${this.name} experience gained!`);
        this.xp += xp;

        if (this.level === 99 ) {
            return;
        }

        let level = this.experienceTable.xpToLevel(this.xp);
        if (this.level < level) {
            this.logger.gold(`Level ${level} in ${this.name} achieved!`);
            this.level = level;
        }
    }

    getXp() {
        return this.xp;
    }

    getLevel() {
        return this.level;
    }

    getId(identifier) {
        return `skill-${identifier}`;
    }
};

export default {
    attack: new Skill("Attack", "ra-sword"),
    constitution: new Skill("Constitution", "ra-hearts"),
    mining: new Skill("Mining", "ra-axe-swing"),
    strength: new Skill("Strength", "ra-muscle-up"),
    agility: new Skill("Agility", "ra-player-dodge"),
    smithing: new Skill("Smithing", "ra-anvil"),
    defence: new Skill("Defence", "ra-shield"),
    herblore: new Skill("Herblore", "ra-leaf"),
    fishing: new Skill("Fishing", "ra-fish"),
    ranged: new Skill("Ranged", "ra-archery-target"),
    thieving: new Skill("Thieving", "ra-aware"),
    cooking: new Skill("Cooking", "ra-chicken-leg"),
    prayer: new Skill("Prayer", "ra-sunbeams "),
    crafting: new Skill("Crafting", "ra-hammer"),
    firemaking: new Skill("Firemaking", "ra-campfire"),
    magic: new Skill("Magic", "ra-fire-symbol"),
    fletching: new Skill("Fletching", "ra-arrow-cluster"),
    woodcutting: new Skill("Woodcutting", "ra-pine-tree"),
    runecrafting: new Skill("Runecrafting", "ra-rune-stone"),
    slayer: new Skill("Slayer", "ra-skull"),
    farming: new Skill("Farming", "ra-carrot"),
    construction: new Skill("Construction", "ra-hand-saw"),
    hunter: new Skill("Hunter", "ra-pawprint"),
    summoning: new Skill("Summoning", "ra-wolf-head"),
    dungeoneering: new Skill("Dungeoneering", "ra-castle-flag"),
    divination: new Skill("Divination", "ra-fairy"),
}
