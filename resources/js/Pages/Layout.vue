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
import tippy from 'tippy.js';
export default {
    mounted() {
        $($(".v-app lication--wrap")[0]).height(window.innerHeight);

        tippy("[data-tippy-content]");
    }
}
</script>
