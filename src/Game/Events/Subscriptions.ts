export default class Subscriptions<EventType, OwnerType> {
    private subscriptions: Map<EventType, Map<string, (owner: OwnerType) => void>> = new Map<EventType, Map<string, (owner: OwnerType) => void>>();

    private owner: OwnerType;

    public constructor(owner: OwnerType) {
        this.owner = owner;
    }

    public subscribe(event: EventType, key: string, callback: (owner: OwnerType) => void): void {
        if (!this.subscriptions.has(event)) {
            this.subscriptions.set(event, new Map<string, (owner: OwnerType) => void>());
        }

        this.subscriptions.get(event)?.set(key, callback);
    }

    public unsubscribe(event: EventType, key: string): void {
        this.subscriptions.get(event)?.delete(key);
    }

    public emit(event: EventType): void {
        if (!this.subscriptions.has(event)) {
            return;
        }

        this.subscriptions.get(event)?.forEach((callback: (owner: OwnerType) => void) => {
            callback(this.owner);
        });
    }

} 