export default class Time {
    private seconds: number;

    public constructor(seconds: number) {
        this.seconds = seconds;
    }

    public setSeconds(seconds: number): Time {
        this.seconds = seconds;
        return this;
    }

    public getSeconds(): number {
        return this.seconds;
    }

    public getFormattedValue(): string {
        let seconds = this.seconds;
        if (seconds <= 60) {
            return `${seconds.toFixed(1)}s`;
        }

        let minutes = Math.floor(seconds / 60);
        if (minutes <= 60) {
            seconds = seconds % 60;
            return `${minutes}m ${seconds.toFixed(1)}s`;
        }

        const hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        seconds = seconds % 60;
        return `${hours}h ${minutes}m ${seconds.toFixed(1)}s`;
    }
}