class Hatchet {
    constructor(bonus, level = 1) {
        this.bonus = bonus;
        this.level = level;
    }

    getBonus() {
        return this.bonus;
    }
};

export default {
    bronze: new Hatchet(5),
    iron: new Hatchet(7),
    steel: new Hatchet(10, 6),
    black: new Hatchet(12, 6),
    mithril: new Hatchet(15, 21),
    adamant: new Hatchet(20, 31),
    rune: new Hatchet(25, 41),
    dragon: new Hatchet(30, 61),
    crystal: new Hatchet(40, 71),
};
