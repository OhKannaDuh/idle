<template>
    <v-app>
        <v-main>
            <v-container ma-0 pa-0 fluid fill-height>
                <slot/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    mounted() {
        $($(".v-application--wrap")[0]).height(window.innerHeight);
    }
}
</script>
