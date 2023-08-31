<template>
    <tr>
        <td v-text="resource.getName()" :class="`text-${resource.getRarity()}`" />
        <td v-if="hasIncome" v-text="`${resource.getIncomePerSecond().toFixed(2)} /s`" class="resource-middle-column" />
        <td v-else />
        <td v-if="hasMax" v-text="`${formatted}/${max}`" class="text-right" />
        <td v-else v-text="formatted" class="text-right" />
    </tr>
    <tr v-if="hasMax && !isMax && resource.getIncomePerSecond() > 0">
        <td v-text="`${timeToFill} to max`" class="text-right text-caption" colspan="3" />
    </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Resource from 'src/Game/Resource';

export default defineComponent({
    name: 'ResourceRow',

    props: {
        resource: {
            type: Resource,
            required: true,
        },
    },

    computed: {
        formatted(): string {
            return this.resource.getAmount().getFormattedAmount();
        },
        hasMax(): boolean {
            return this.resource.getAmount().hasMax();
        },
        isMax(): boolean {
            return this.resource.getAmount().isMax();
        },
        max(): number {
            return this.resource.getAmount().getMax();
        },
        timeToFill(): string {
            return this.resource.getSecondsToFill().getFormattedValue();
        },
        hasIncome(): boolean {
            const seconds = this.resource.getSecondsToFill().getSeconds();
            return seconds !== Infinity && seconds !== 0;
        }
    }

});
</script>


<style>
.resource-middle-column {
    padding: 0px 32px;
}
</style>