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
                        <v-list-item @click="player.bankItem(item, bank);player.getInventory().items.splice(identifier, 1)">
                            <v-list-item-title>Bank</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="player.addCoins(item.item.getValue() * item.quantity);player.getInventory().items.splice(identifier, 1)">
                            <v-list-item-title>
                                Sell <span v-if="item.quantity > 1">all</span>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="item.quantity > 1" @click="player.addCoins(item.item.getValue());player.getInventory().items[identifier].quantity--">
                            <v-list-item-title>Sell one</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="player.getInventory().items.splice(identifier, 1)">
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
                <v-card tile flat data-tippy-content="Bank inventory" class="text-center" @click="player.bankAll(bank)">
                    <v-card-text>
                        <v-icon>mdi-arrow-right-bold</v-icon>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ["player", "visible", "bank"],
}
</script>
