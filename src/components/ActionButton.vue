<template>
    <div class="col-3 q-px-xs">
        <q-btn class="bg-none fill-width action-button" flat square v-if="isUnlocked" :label="label" :disabled="isMax"
            :ripple="!isMax" @click="add(1)" :class="{ capped: isMax }" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Resource from 'src/Game/Resource';

export default defineComponent({
    name: 'ActionButton',
    props: {
        resource: {
            type: Resource,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },

    methods: {
        add(amount: number): void {
            this.resource.getAmount().add(amount);
        },
    },

    computed: {
        isUnlocked(): boolean {
            return this.resource.isUnlocked();
        },
        isMax(): boolean {
            return this.resource?.getAmount().isMax();
        }

    }

});
</script>

<style>
.action-button {
    border-bottom: 2px solid white;
}

.capped {
    border-bottom: 2px solid red;
}
</style>