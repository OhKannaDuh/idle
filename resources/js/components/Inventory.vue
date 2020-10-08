<template>
    <v-container fluid ma-0 :class="{hidden: !visible}">
        <v-row dense>
            <v-col cols="3" v-for="(item,identifier) in player.getInventory().getItems()" :key="identifier">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-card class="skill" v-bind="attrs" v-on="on">
                            <v-card-text>
                                {{ item.item.getName() }}
                                <span v-if="item.item.canStack()">
                                    ({{ item.quantity }})
                                </span>
                            </v-card-text>
                        </v-card>
                    </template>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title>Destroy</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
            <v-col cols="3" v-for="index in player.getInventory().getRemainingSpace()" :key="index + player.getInventory().items.length">
                <v-card tile flat>
                    <v-card-text>&nbsp;</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row class="mt-4" dense>
            <v-col cols="3">
                <v-card tile flat data-tippy-content="Coins" class="text-center">
                    <v-card-text v-text="player.getPurse().getCoins()"></v-card-text>
                </v-card>
            </v-col>
            <v-col cols="3" offset="6">
                <v-card tile flat data-tippy-content="Coins" class="text-center">
                    <v-card-text v-text="player.getPurse().getCoins()"></v-card-text>
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
