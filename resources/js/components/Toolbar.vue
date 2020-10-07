<template>
    <v-app-bar app clipped-left flat>
        <v-toolbar-title>
            <inertia-link href="/" v-html="title"></inertia-link>
        </v-toolbar-title>
    </v-app-bar>
</template>

<script>
export default {
    props: {
        title: String,
        navigation: Object,
    }
}
</script>
