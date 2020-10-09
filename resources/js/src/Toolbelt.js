import hatchets from "./tools/hatchets";

export default class Toolbelt {
    constructor() {
        this.hatchets = hatchets;
        this.hatchet = hatchets.bronzeHatchet;
    }

    getHatchets() {
        return this.hatchets;
    }

    setHatchet(hatchet) {
        this.hatchet = hatchet;
    }

    getHatchet() {
        return this.hatchet;
    }
}
