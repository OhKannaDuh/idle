<template>
    <v-dialog v-model="active" fullscreen hide-overlay width="75%" transition="dialog-bottom-transition">
        <v-card color="#2B3840">
            <v-toolbar flat color="#111e26">
                <v-spacer></v-spacer>
                <v-btn @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
             <v-container ma-0 pa-0 fluid>
                    <v-row dense>
                        <v-col cols="2" v-for="stack in bank.getItems()" :key="stack.item.getIdentifier()">
                            <v-card>
                                <v-card-title v-text="stack.item.getName()"></v-card-title>
                                <v-card-subtitle v-text="stack.quantity"></v-card-subtitle>
                            </v-card>
                        </v-col>
                    </v-row>
             </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["active", "player", "bank"],
    methods: {
        close() {
            this.$emit("close");
        }
    }
}
</script>
