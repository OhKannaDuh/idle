import { BuildingCost, } from 'src/data/buildings';
import Amount from '../Amount';
import Subscriptions from '../Events/Subscriptions';
import ResourceManager from '../ResourceManager';
import { BuildingSaveData, SaveData } from '../Saves/SaveManager';
import StringHelper from '../StringHelper';
import BuildingEvent from './BuildingEvent';

export default class Building {
    private name: string;

    private key: string;

    private cost: BuildingCost[];

    private resources: ResourceManager;

    private amount: Amount;

    private subscriptions: Subscriptions<BuildingEvent, Building>;

    private unlocked = false;

    public constructor(name: string, cost: BuildingCost[], resources: ResourceManager) {
        this.name = name;
        this.key = StringHelper.key(name);
        this.cost = cost;
        this.resources = resources;
        this.amount = new Amount();
        this.subscriptions = new Subscriptions<BuildingEvent, Building>(this);
    }

    public getName(): string {
        return this.name;
    }

    public getKey(): string {
        return this.key;
    }

    public getBaseCost(): BuildingCost[] {
        return this.cost;
    }

    public getCost(): BuildingCost[] {
        const cost: BuildingCost[] = [];
        for (const requirement of this.cost) {
            cost.push({
                key: requirement.key,
                amount: Math.round(requirement.amount * 1.15 ** (this.amount.getValue())),
            });
        }

        return cost;
    }

    public getAmount(): Amount {
        return this.amount;
    }

    public getSubscriptions(): Subscriptions<BuildingEvent, Building> {
        return this.subscriptions;
    }

    public isUnlocked(): boolean {
        return this.unlocked;
    }

    public unlock(): Building {
        if (this.unlocked === false) {
            this.subscriptions.emit(BuildingEvent.Unlock);
            this.unlocked = true;
        }

        return this;
    }

    public canBuild(): boolean {
        if (!this.unlocked) {
            return false;
        }

        for (const requirement of this.getCost()) {
            const amount = this.resources.get(requirement.key)?.getAmount().getValue() ?? 0;
            if (amount < requirement.amount) {
                return false;
            }
        }

        return true;
    }

    public build(): void {
        if (!this.canBuild()) {
            return;
        }

        for (const requirement of this.cost) {
            this.resources.get(requirement.key)?.getAmount().sub(requirement.amount);
        }

        this.amount.add(1);
        this.subscriptions.emit(BuildingEvent.Build);
    }

    public save(data: SaveData): SaveData {
        data.buildings[this.key] = {
            name: this.name,
            amount: this.amount.getValue(),
            unlocked: this.unlocked,
        };

        return data;
    }

    public load(data: BuildingSaveData): void {
        this.amount.setValue(data.amount);
        if (data.unlocked) {
            this.unlock();
        }
    }
}