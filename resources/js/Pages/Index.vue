<template>
    <v-row no-gutters class="fill-height">
        <navigation :navigation="navigation"></navigation>
        <v-col cols="9" class="d-flex" style="flex-direction:column">
            <v-card flat tile>
                <v-toolbar flat color="#111e26">
                    <v-app-bar-nav-icon @click.stop="navigation.show = !navigation.show"></v-app-bar-nav-icon>
                    <v-spacer></v-spacer>
                    <span>Total Xp: {{ player.getTotalXp() }}</span>
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
                                        <v-btn tile depressed block class="flex-grow-1" data-tippy-content="Shop">
                                            <v-icon>mdi-purse</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col class="flex-grow-1 pa-2">
                                        :D
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
            <v-card flat tile class="flex-grow-1" color="#37444C" height="100%" style="overflow-y: scroll">
                <v-container fluid ma-0 pa-0>
                    <v-row no-gutters>
                        <v-col>
                            <v-btn block tile depressed @click="tab = 'skills'" data-tippy-content="Skills">
                                <v-icon>mdi-poll</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block tile depressed @click="tab = 'inventory'" data-tippy-content="Inventory">
                                <v-icon>mdi-bag-checked</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block tile depressed @click="tab = 'toolbelt'" data-tippy-content="Toolbelt">
                                <v-icon>mdi-toolbox</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <skills :player="player" :visible="tab === 'skills'"></skills>
                        <inventory :player="player" :visible="tab === 'inventory'"></inventory>
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
import Layout from "./Layout";
import Loop from "../src/Loop";
import Logger from "../src/Logger";
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
            navigation: {
                show: false,
            },
            // Classes
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
            this.loop.tick(this.activity, this.locations[this.location], this.player, this.logger)
        }
    },
    mounted() {
        this.loop.start(this);
    }
}
</script>
