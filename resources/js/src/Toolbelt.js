export default class Toolbelt {
    constructor() {
        this.hatchet = require("./tools/hatchets").default.bronze;
    }

    setHatchet(hatchet) {
        this.hatchet = hatchet;
    }

    getHatchet() {
        return this.hatchet;
    }
}
