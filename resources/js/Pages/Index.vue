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
                <log :logs="logs"></log>
            </v-card>
        </v-col>
        <v-col cols="3" class="d-flex" style="flex-direction:column">
            <v-card flat tile class="flex-grow-1" color="#1E2B33">
                <v-card-actions>
                    <v-select v-model="activity" :items="locations[this.location].getActivities()" @change="updateAction" return-object></v-select>
                </v-card-actions>
            </v-card>
            <v-card flat tile class="flex-grow-0" color="#1E2B33" style="border-top: 1px solid silver">
                <progress-bar :max="activity ? activity.ticks : 0" :value="loop.getTick()"></progress-bar>
            </v-card>
            <v-card flat tile class="flex-grow-0" color="#37444C">
                <v-container fluid ma-0 pa-0>
                    <v-row no-gutters>
                        <v-col>
                            <v-btn id="skills-button" block tile depressed @click="tab = 'skills'">
                                <v-icon>mdi-poll</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn id="inventory-button" block tile depressed @click="tab = 'inventory'">
                                <v-icon>mdi-bag-checked</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn id="toolbelt-button" block tile depressed @click="tab = 'toolbelt'">
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
        },
        getMainDisplayAreaHeight() {
            console.log(window.innerHeight);
            return window.innerHeight - 250 - 64;
        }
    },
    mounted() {
        for (let identifier in this.player.getSkills()) {
            let skill = this.player.getSkill(identifier);
            tippy(`#${skill.getId(identifier)}`, {content: skill.getName()});
        }

        tippy("#skills-button", {content: "Skills"});
        tippy("#inventory-button", {content: "Inventory"});
        tippy("#toolbelt-button", {content: "Toolbelt"});

        this.loop.start(this);
    }
}
</script>
