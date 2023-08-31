<template>
    <div class="col-3 q-px-xs">
        <q-btn class="bg-none fill-width action-button"
            :label="`${building.getName()} (${building.getAmount().getValue()})`" flat square :disabled="!canBuild()"
            :ripple="canBuild()" v-if="isUnlocked()" :class="{ 'cannot-build': !canBuild() }" @click="build()">

            <q-tooltip>
                <p v-for="(requirement, index) in building.getCost()" :key="index" class='q-pa-none q-ma-none'
                    v-text="`${requirement.key}: ${requirement.amount}`" />
            </q-tooltip>
        </q-btn>
    </div>
</template>

<script lang="ts">
import Building from 'src/Game/Buildings/Building';
import ResourceManager from 'src/Game/ResourceManager';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BuildingButton',
    props: {
        building: {
            type: Building,
            required: true,
        },
        resources: {
            type: ResourceManager,
            required: true,
        }
    },

    methods: {
        isUnlocked(): boolean {
            return this.building.isUnlocked();
        },
        canBuild(): boolean {
            return this.building.canBuild();
        },
        build(): void {
            this.building.build();
        }
    },

});
</script>

<style>
.action-button {
    border-bottom: 2px solid white;
}

.cannot-build {
    border-bottom: 2px solid red;
}
</style>