import Building from 'src/Game/Buildings/Building';
import BuildingEvent from 'src/Game/Buildings/BuildingEvent';
import Game from 'src/Game/Game';
import Resource from 'src/Game/Resource';
import ResourceEvent from 'src/Game/ResourceEvent';

export type BuildingCost = {
    key: string;
    amount: number;
};

export type BuildingData = {
    name: string;
    cost: BuildingCost[];
    setup: (building: Building, game: Game) => void;
    init: (building: Building, game: Game) => void;
};

export const buildings: BuildingData[] = [
    {
        name: 'House',
        cost: [
            {
                key: 'wood',
                amount: 10,
            }
        ],
        setup(building: Building, game: Game): void {
            building.getSubscriptions().subscribe(BuildingEvent.Build, 'build', () => {
                game.getResources().get('population')?.getAmount().setMax(building.getAmount().getValue());
            });
        },
        init(building: Building, game: Game): void {
            game.getResources().get('population')?.getAmount().setMax(building.getAmount().getValue());
        }
    },
    {
        name: 'Warehouse',
        cost: [
            {
                key: 'wood',
                amount: 15,
            }
        ],
        setup(building: Building, game: Game): void {
            building.getSubscriptions().subscribe(BuildingEvent.Build, 'build', () => {
                this.init(building, game);
            });
        },
        init(building: Building, game: Game): void {
            const modifier = 75 * building.getAmount().getValue();
            game.getResources().get('wood')?.getAmount().setMax(50 + modifier);
            game.getResources().get('food')?.getAmount().setMax(50 + modifier);
        }
    },
    {
        name: 'Lumber Yard',
        cost: [
            {
                key: 'wood',
                amount: 20,
            }
        ],
        setup(building: Building, game: Game): void {
            building.getSubscriptions().subscribe(BuildingEvent.Build, 'build', () => {
                game.getResources().get('wood')?.calculateIncomePerSecond();
            });
        },
        init(building: Building, game: Game): void {
            game.getResources().get('wood')?.getSubscriptions().subscribe(ResourceEvent.CalculateIncomePerSecond, 'lumber-yard-wood', (resource: Resource): void => {
                resource.increaseIncomePerSecond(building.getAmount().getValue() * 1.3);
            });
        }
    },
    {
        name: 'Farm',
        cost: [
            {
                key: 'wood',
                amount: 5,
            },
            {
                key: 'food',
                amount: 20,
            },
        ],
        setup(building: Building, game: Game): void {
            building.getSubscriptions().subscribe(BuildingEvent.Build, 'build', () => {
                game.getResources().get('food')?.calculateIncomePerSecond();
            });
        },
        init(building: Building, game: Game): void {
            game.getResources().get('food')?.getSubscriptions().subscribe(ResourceEvent.CalculateIncomePerSecond, 'food-food', (resource: Resource): void => {
                resource.increaseIncomePerSecond(building.getAmount().getValue() * 2.1);
            });
        }
    },
];

export default buildings;