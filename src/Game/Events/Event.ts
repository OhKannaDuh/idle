import { EventData, Setup, Teardown } from 'src/data/events';

export default class Event {
    private key: string;

    private requires: string[];

    public readonly setup: Setup;

    public readonly teardown: Teardown;

    public constructor(data: EventData) {
        this.key = data.key;
        this.requires = data.requires;
        this.setup = data.setup;
        this.teardown = data.teardown;
    }

    public getKey(): string {
        return this.key;
    }

    public isReady(completed: string[]): boolean {
        if (completed.includes(this.key)) {
            // This event has already been completed
            return false;
        }

        for (const key of this.requires) {
            if (!completed.includes(key)) {
                // A required event has not been completed
                return false;
            }
        }

        return true;
    }

}