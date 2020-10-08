<template>
    <v-row no-gutters class="fill-height">
        <v-col cols="9">
            <bank :active="showBank" :player="player" :bank="bank" @close="showBank=false"></bank>
        </v-col>
        <navigation :navigation="navigation"></navigation>
        <v-col cols="9" class="d-flex" style="flex-direction:column">
            <v-card flat tile>
                <v-toolbar flat color="#111e26">
                    <v-app-bar-nav-icon @click.stop="navigation.show = !navigation.show"></v-app-bar-nav-icon>
                    <v-spacer></v-spacer>
                    <v-btn depressed tile @click="player.bankAll(bank)" data-tippy-content="Bank Inventory" class="ml-2" :disabled="player.getInventory().getItems().length === 0">
                        <v-icon>mdi-arrow-right-bold</v-icon>
                    </v-btn>
                    <v-btn depressed tile @click="showBank=true" data-tippy-content="Bank" class="ml-2">
                        <v-icon>mdi-treasure-chest</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card>
            <v-card flat tile class="flex-grow-1" color="#2B3840" >
                <v-container ma-0 pa-0 fluid>
                    <v-row no-gutters>
                        <v-col>
                            <world-map></world-map>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-card flat tile min-height="250px" max-height="250px" color="#1E2B33">
                <v-container ma-0 pa-0 fluid>
                    <v-row no-gutters>
                        <v-col cols="6">
                            <log :logs="logs"></log>
                        </v-col>
                        <v-col cols="6">
                            <v-container ma-0 pa-0 fluid fill-height>
                                <v-row no-gutters class="fill-height">
                                    <v-col class="flex-grow-0 d-flex" style="flex-direction:column">
                                        <v-btn tile depressed block class="flex-grow-1" data-tippy-content="Shop" @click="tab2 = 'shop'">
                                            <v-icon>mdi-basket</v-icon>
                                        </v-btn>
                                        <v-btn tile depressed block class="flex-grow-1" data-tippy-content="Floor" @click="tab2 = 'floor'">
                                            <v-icon>mdi-purse</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col class="flex-grow-1 pa-2" :class="{hidden: tab2 != 'shop'}">
                                        Shop
                                    </v-col>
                                    <v-col class="flex-grow-1" :class="{hidden: tab2 !== 'floor'}" style="max-height:250px">
                                        <v-list style="overflow-y: scroll" height="100%">
                                            <v-list-item v-for="(stack,index) in floor.getItems()" :key="index">
                                                <v-list-item-content>
                                                    <v-row no-gutters>
                                                        <v-col class="flex-grow-1">
                                                            <v-list-item-title v-text="stack.item.getName()"></v-list-item-title>
                                                            <v-list-item-subtitle v-text="stack.quantity" :class="{
                                                                'red--text': stack.quantity >= stack.item.getFloorStackSize(),
                                                                'orange--text': stack.quantity >= stack.item.getFloorStackSize() * 0.9,
                                                                'yellow--text': stack.quantity >= stack.item.getFloorStackSize() * 0.75,
                                                            }"></v-list-item-subtitle>
                                                        </v-col>
                                                        <v-col class="flex-grow-0">
                                                            <v-btn @click="floor.takeItem(stack.item, stack.quantity, player)">Take all</v-btn>
                                                        </v-col>
                                                        <v-col class="flex-grow-0">
                                                            <v-btn @click="floor.takeItem(stack.item, 1, player)">Take one</v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
        <v-col cols="3" class="d-flex" style="flex-direction:column">
            <v-card flat tile class="flex-grow-1" color="#1E2B33" height="100%">
                <v-card-actions>
                    <v-select label="Action" v-model="activity" :items="locations[this.location].getActivities()" @change="updateAction" return-object></v-select>
                </v-card-actions>
            </v-card>
            <v-card flat tile class="flex-grow-0" color="#1E2B33" style="border-top: 1px solid silver">
                <progress-bar :max="activity ? activity.ticks : 0" :value="loop.getTick()"></progress-bar>
            </v-card>
            <v-card flat tile class="flex-grow-1" color="#37444C" height="100%" id="lower-right-section">
                <v-container fluid ma-0 pa-0 fill-height>
                    <v-row no-gutters class="flex-grow-0">
                        <v-col>
                            <v-btn block tile depressed @click="tab = 'skills'" data-tippy-content="Skills">
                                <v-icon>mdi-poll</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block tile depressed @click="tab = 'inventory'" data-tippy-content="Inventory">
                                <v-icon>mdi-sack</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block tile depressed @click="tab = 'toolbelt'" data-tippy-content="Toolbelt">
                                <v-icon>mdi-toolbox</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row no-gutters id="lower-right-section-content" class="flex-grow-1">
                        <skills :player="player" :visible="tab === 'skills'"></skills>
                        <inventory :player="player" :visible="tab === 'inventory'" :bank="bank"></inventory>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
// Data imports
import locations from "./../src/locations";

// Class imports
import Bank from "../src/Bank";
import Floor from "../src/Floor";
import Layout from "./Layout";
import Logger from "../src/Logger";
import Loop from "../src/Loop";
import Player from "../src/Player";

// Function imports
import tippy from "tippy.js";

export default {
    layout: Layout,
    data() {
        return {
            // Data
            activity: null,
            location: "oakbridge",
            locations: locations,
            logs: window.logs,
            tab: "skills",
            tab2: "shop",
            navigation: {
                show: false,
            },
            showBank: false,
            // Classes
            bank: new Bank(),
            floor: new Floor(),
            logger: new Logger(),
            loop: new Loop(),
            player: new Player(),
        }
    },
    methods: {
        updateAction() {
            this.loop.reset();
        },
        tick() {
            this.loop.tick(this.activity, this.locations[this.location], this.player, this.logger, this)
        }
    },
    mounted() {
        this.player.setFloor(this.floor);
        this.loop.start(this);
    }
}
</script>
