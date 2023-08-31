import AmountEvent from 'src/Game/AmountEvent';
import Building from 'src/Game/Buildings/Building';
import BuildingEvent from 'src/Game/Buildings/BuildingEvent';
import Game from 'src/Game/Game';
import Job from 'src/Game/Jobs/Job';
import Resource from 'src/Game/Resource';
import ResourceEvent from 'src/Game/ResourceEvent';

export type JobData = {
    name: string;
    setup: (job: Job, game: Game) => void;
    init: (job: Job, game: Game) => void;
};

export const jobs: JobData[] = [
    {
        name: 'Lumberjack',
        setup(job: Job, game: Game): void {
            game.getBuildings().get('lumber_yard')?.getSubscriptions().subscribe(BuildingEvent.Build, 'lumberjack_lumberyard_build', (building: Building) => {
                this.init(job, game);
            });

            game.getResources().get('wood')?.getSubscriptions().subscribe(ResourceEvent.CalculateIncomePerSecond, 'lumberjack_work', (resource: Resource) => {
                const resourcePerWorker = 0.8;
                resource.increaseIncomePerSecond(job.getAmount().getValue() * resourcePerWorker);
            });

            job.getAmount().getSubscriptions().subscribe(AmountEvent.Add, 'lumberjack-add', () => {
                console.log('worker added.');
                game.getResources().get('wood')?.calculateIncomePerSecond();
            });

            job.getAmount().getSubscriptions().subscribe(AmountEvent.Sub, 'lumberjack-sub', () => {

                console.log('worker removed.');
                game.getResources().get('wood')?.calculateIncomePerSecond();
            });

        },
        init(job: Job, game: Game): void {
            const max = game.getBuildings().get('lumber_yard')?.getAmount().getValue() ?? 0;
            game.getJobs().get('lumberjack')?.getAmount().setMax(max);
        }
    },
];

export default jobs;