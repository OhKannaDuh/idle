<template>
    <v-container fluid ma-0 :class="{hidden: !visible}">
        <v-row dense>
            <v-col cols="3" v-for="(item,identifier) in player.getInventory().getItems()" :key="identifier">
                <v-card class="skill">
                    <v-card-text>
                        {{ item.item.getName() }}
                        <span v-if="item.item.canStack()">
                            ({{ item.quantity }})
                        </span>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="3" v-for="index in player.getInventory().getRemainingSpace()" :key="index + player.getInventory().items.length">
                <v-card class="invisible" tile flat>
                    <v-card-text>&nbsp;</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ["player", "visible"],
}
</script>
