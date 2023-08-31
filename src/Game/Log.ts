export default class Log {
    private message: string;

    private color = 'white';

    public constructor(message: string) {
        this.message = message;
    }

    public getMessage(): string {
        return this.message;
    }

    public getColor(): string {
        return this.color;
    }

    public default(): Log {
        this.color = 'white';
        return this;
    }

    public unlock(): Log {
        this.color = 'blue';
        return this;
    }
}