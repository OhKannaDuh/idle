import AmountFormat from 'src/Game/AmountFormat';
import Rarity from './rarity';

export type ResourceData = {
    name: string;
    max: number;
    rarity: Rarity;
    format: AmountFormat;
    unlocked: boolean;
    show: boolean;
};

// Helper function to reduce bloat
function create(name: string, overrides: { [key: string]: any } = {}): ResourceData {
    const resource = {
        name: name,
        max: 50,
        rarity: Rarity.Common,
        format: AmountFormat.Float,
        unlocked: false,
        show: true,
    };

    if (overrides.max !== undefined) {
        resource.max = overrides.max;
    }

    if (overrides.rarity !== undefined) {
        resource.rarity = overrides.rarity;
    }

    if (overrides.format !== undefined) {
        resource.format = overrides.format;
    }

    if (overrides.unlocked !== undefined) {
        resource.unlocked = overrides.unlocked;
    }

    if (overrides.show !== undefined) {
        resource.show = overrides.show;
    }

    return resource;
}

export const resources: ResourceData[] = [
    create('Wood', { unlocked: true }),
    create('Food'),
    create('Stone'),
    create('Population', { rarity: Rarity.Uncommon, max: 1, format: AmountFormat.Int, show: false }),
];

export default resources;