export default class ExperienceTable {
        equate (xp) {
            return Math.floor(xp + 300 * Math.pow(2, xp / 7));
        };

        levelToXp (level) {
            let xp = 0;

            for (let i = 1; i < level; i++) {
                xp += this.equate(i);
            }

            return Math.floor(xp / 4);
        };

        xpToLevel (xp) {
            for (let level = 1; level < 100; level++) {
                let experienceRequired = this.levelToXp(level);

                if (xp >= experienceRequired) {
                    continue;
                }

                return level - 1;
            }

            return 99;
        };
};
