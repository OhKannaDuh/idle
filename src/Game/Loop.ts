export default class Loop {
    private last = 0;

    public init() {
        this.last = this.getCurrentTimestamp();
    }

    public tick(): number {
        const current: number = this.getCurrentTimestamp();

        const delta: number = current - this.last;
        this.last = current;

        return delta;
    }



    private getCurrentTimestamp(): number {
        return Date.now() / 1000;
    }
};