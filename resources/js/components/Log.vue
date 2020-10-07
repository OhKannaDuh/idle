<template>
    <div id="log-pane">
        <p v-for="(log,index) in logs" :key="index" class="log" :class="log.color" v-text="log.text"></p>
    </div>
</template>

<script>
export default {
    props: ["logs"]
}
</script>
