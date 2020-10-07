<template>
    <div class="progress" :style="{width: getPercentage()}"></div>
</template>

<script>
export default {
    props: ["max", "value"],
    methods: {
        getPercentage() {
            // let percentage = this.value / this.max
            return `${this.value / this.max * 100}%`;
        }
    }
}
</script>
