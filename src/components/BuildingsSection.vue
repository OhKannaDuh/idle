<template>
    <div class="row q-pa-md">
        <p class="text-h6 fill-width q-ma-none title">Buildings</p>
    </div>
    <div class="row q-pa-md">
        <building-button v-for="[key, building] in buildings.all()" :key="key" :building="building"
            :resources="resources" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BuildingButton from 'src/components/BuildingButton.vue';
import BuildingManager from 'src/Game/Buildings/BuildingManager';
import ResourceManager from 'src/Game/ResourceManager';
import Game from 'src/Game/Game';

export default defineComponent({
    name: 'BuildingsSection',

    components: {
        BuildingButton,
    },

    props: {
        game: {
            type: Game,
            required: true,
        }
    },

    computed: {
        buildings(): BuildingManager {
            return this.game.getBuildings();
        },
        resources(): ResourceManager {
            return this.game.getResources();
        }
    }

});
</script>