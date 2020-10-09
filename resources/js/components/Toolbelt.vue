<template>
 <v-container fluid ma-0 :class="{hidden: !visible}" height="100%">
        <v-row dense>
            <v-col cols="6">
                <v-card>
                    <v-card-title>Hatchet:</v-card-title>
                    <v-card-subtitle>Increase chance to obtain items while woodcutting</v-card-subtitle>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <v-card-title v-text="hatchet.getItem().getName()"></v-card-title>
                    <v-card-subtitle>Bonus: {{ hatchet.getBonus() }}%<br/>&nbsp;</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ["player", "visible"],
    computed: {
        hatchet() {
            return this.player.getToolbelt().getHatchet();
        }
    }
}
</script>
