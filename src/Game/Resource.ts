import Rarity from 'src/data/rarity';
import Amount from './Amount';
import AmountEvent from './AmountEvent';
import Subscriptions from './Events/Subscriptions';
import ResourceEvent from './ResourceEvent';
import Saveable from './Saves/Saveable';
import { ResourceSaveData, SaveData } from './Saves/SaveManager';
import StringHelper from './StringHelper';
import Time from './Time';


export default class Resource implements Saveable {
    private name: string;

    private key: string;

    private amount: Amount;

    private subscriptions: Subscriptions<ResourceEvent, Resource>;

    private rarity: Rarity = Rarity.Common;

    private unlocked = false;

    private show = true;

    private incomePerSecond = 0;

    public constructor(name: string) {
        this.name = name;
        this.key = StringHelper.key(name);
        this.amount = new Amount();
        this.subscriptions = new Subscriptions<ResourceEvent, Resource>(this);

        this.amount.getSubscriptions().subscribe(AmountEvent.Add, 'resource-add', () => {
            this.subscriptions.emit(ResourceEvent.Add);
        });

        this.amount.getSubscriptions().subscribe(AmountEvent.Sub, 'resource-sub', () => {
            this.subscriptions.emit(ResourceEvent.Sub);
        });

        this.amount.getSubscriptions().subscribe(AmountEvent.Max, 'resource-max', () => {
            this.subscriptions.emit(ResourceEvent.Max);
        });

        this.amount.getSubscriptions().subscribe(AmountEvent.Min, 'resource-min', () => {
            this.subscriptions.emit(ResourceEvent.Min);
        });
    }

    public getName(): string {
        return this.name;
    }

    public getKey(): string {
        return this.key;
    }

    public getAmount(): Amount {
        return this.amount;
    }

    public getSubscriptions(): Subscriptions<ResourceEvent, Resource> {
        return this.subscriptions;
    }

    public setRarity(rarity: Rarity): Resource {
        this.rarity = rarity;
        return this;
    }

    public getRarity(): Rarity {
        return this.rarity;
    }

    public isUnlocked(): boolean {
        return this.unlocked;
    }

    public unlock(): Resource {
        this.unlocked = true;
        return this;
    }

    public isShown(): boolean {
        return this.show;
    }

    public hide(): Resource {
        this.show = false;
        return this;
    }

    public getIncomePerSecond(): number {
        return this.incomePerSecond;
    }

    public increaseIncomePerSecond(by: number): Resource {
        this.incomePerSecond += by;
        return this;
    }

    public calculateIncomePerSecond(): Resource {
        this.incomePerSecond = 0;
        this.subscriptions.emit(ResourceEvent.CalculateIncomePerSecond);
        return this;
    }

    public getSecondsToFill(): Time {
        if (!this.amount.hasMax() || this.amount.isMax()) {
            return new Time(0);
        }

        const remaining = this.amount.getMax() - this.amount.getValue();
        const seconds = remaining / this.getIncomePerSecond();

        return new Time(seconds);
    }

    public save(data: SaveData): SaveData {
        data.resources[this.key] = {
            name: this.name,
            amount: this.amount.getValue(),
            unlocked: this.unlocked,
        };

        return data;
    }

    public load(data: ResourceSaveData): void {
        this.amount.setValue(data.amount);
        if (data.unlocked) {
            this.unlock();
        }
    }

    public tick(delta: number): void {
        this.subscriptions.emit(ResourceEvent.Tick);
        this.amount.floor();
        const increment: number = (this.getIncomePerSecond() * delta);
        if (increment > 0) {
            this.amount.add(increment);
        }

        if (increment < 0) {
            this.amount.sub(-increment);
        }

        this.amount.floor().ceiling();
    }
}