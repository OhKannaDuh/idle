<template>
    <q-page class="row items-start justify-start">
        <div class="col q-pa-md capped-column">
            <table class="fill-width bordered-bottom" v-if="game.getResources().get('population')?.isUnlocked()">
                <resource-row :resource="(game.getResources().get('population') as Resource)" />
            </table>

            <table class="fill-width">
                <resource-row v-for="resource in game.getResources().unlocked()" :key="resource.getKey()"
                    :resource="resource" />
            </table>
        </div>
        <div class="col q-pa-md">
            <div class="row q-pa-md">
                <q-btn class="bg-red" label="Reset" @click="game.reset()" />
            </div>
            <div v-if="loaded">
                <actions-section :game="_game" />
                <buildings-section :game="_game" />


                <div class="row q-pa-md">
                    <p class="text-h6 fill-width q-ma-none title">Jobs</p>
                </div>
                <div class="row q-pa-md">
                    <job-management v-for="job in game.getJobs().unlocked()" :key="job.getKey()" :job="job" />
                </div>
            </div>
        </div>
        <div class="col q-pa-md capped-column">
            <p v-for="(log, index) in logs" :key="index" v-text="log.getMessage()" :class="`text-${log.getColor()}`" />
        </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Game from 'src/Game/Game';
import ActionsSection from 'src/components/ActionsSection.vue';
import BuildingsSection from 'src/components/BuildingsSection.vue';
import JobManagement from 'src/components/JobManagement.vue';
import ResourceRow from 'src/components/ResourceRow.vue';
import Log from 'src/Game/Log';
import Resource from 'src/Game/Resource';

export default defineComponent({
    name: 'IndexPage',

    components: {
        ActionsSection,
        BuildingsSection,
        JobManagement,
        ResourceRow,
    },

    setup() {
        const game = ref<Game>(new Game());
        const loaded = ref<boolean>(false);
        return {
            game,
            loaded,
        };
    },

    mounted() {
        this.game.init();
        this.game.start();

        this.loaded = true;
    },

    computed: {
        logs(): Log[] {
            return this.game.getLogs();
        },
        _game(): Game {
            return this.game as Game;
        }
    }
});
</script>

<style>
.capped-column {
    max-width: 320px !important;
    border-right: 1px solid black;
    height: 100%;
}

.fill-width {
    width: 100%;
}

.title {
    border-bottom: 1px solid white;
}

.bordered-bottom {
    border-bottom: 1px solid white;
    ;
}
</style>