import AmountEvent from './AmountEvent';
import AmountFormat from './AmountFormat';
import Subscriptions from './Events/Subscriptions';

export default class Amount {
    private value = 0;

    private max = 0;

    private subscriptions: Subscriptions<AmountEvent, Amount>;

    private format: AmountFormat = AmountFormat.Float;

    public constructor() {
        this.subscriptions = new Subscriptions<AmountEvent, Amount>(this);
    }

    public setValue(value: number): Amount {
        this.value = value;
        return this;
    }

    public getValue(): number {
        return this.value;
    }

    public getFormattedAmount(): string {
        if (this.format === AmountFormat.Float) {
            return this.getValue().toFixed(2);
        }

        if (this.format === AmountFormat.Int) {
            return this.getValue().toFixed(0);
        }

        return this.getValue().toFixed(2);
    }

    public setMax(max: number): Amount {
        this.max = max;
        return this;
    }

    public getMax(): number {
        return this.max;
    }

    public hasMax(): boolean {
        return this.max > 0;
    }

    public isMax(): boolean {
        return this.hasMax() ? (this.value >= this.max) : false;
    }

    public getSubscriptions(): Subscriptions<AmountEvent, Amount> {
        return this.subscriptions;
    }

    public setFormat(format: AmountFormat): Amount {
        this.format = format;
        return this;
    }

    private emitMinAndMaxEvents() {
        if (this.value === 0) {
            this.subscriptions.emit(AmountEvent.Min);
        }

        if (this.isMax()) {
            this.subscriptions.emit(AmountEvent.Max);
        }
    }

    public add(value: number): Amount {
        this.value += value;
        this.subscriptions.emit(AmountEvent.Add);
        this.emitMinAndMaxEvents();
        return this;
    }

    public sub(value: number): Amount {
        this.value -= value;
        this.subscriptions.emit(AmountEvent.Sub);
        this.emitMinAndMaxEvents();
        return this;
    }

    public floor(): Amount {
        this.value = Math.max(this.value, 0);
        return this;
    }

    public ceiling(): Amount {
        if (this.max === 0) {
            return this;
        }

        this.value = Math.min(this.value, this.max);
        return this;
    }
}