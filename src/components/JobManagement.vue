<template>
    <p v-text="`${job.getName()} ${value} /${max}`" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Job from 'src/Game/Jobs/Job';

export default defineComponent({
    name: 'JobManagement',

    props: {
        job: {
            type: Job,
            required: true,
        }
    },

    computed: {
        value(): number {
            return this.job.getAmount().getValue();
        },
        max(): number {
            return this.job.getAmount().getMax();
        }
    }



});
</script>