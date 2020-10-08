<template>
    <v-container fluid ma-0 :class="{hidden: !visible}" height="100%">
        <v-row dense>
            <v-col cols="3" v-for="(skill,identifier) in player.getSkills()" :key="identifier">
                <v-card class="skill" tile flat :data-tippy-content="skill.getName()">
                    <v-card-text>
                        <v-row no-gutters>
                            <v-col class="flex-grow-0">
                                <i class="ra ra-fw" :class="skill.getIcon()"></i>
                            </v-col>
                            <v-col class="flex-grow-1 text-right">
                                <span> {{ skill.getLevel() }} / 99</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mt-4" dense>
            <v-col cols="3">
                <v-card class="skill text-center" tile flat data-tippy-content="Total Xp">
                    <v-card-text v-text="player.getTotalXp()"></v-card-text>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card class="skill text-center" tile flat data-tippy-content="Total Level">
                    <v-card-text v-text="player.getTotalLevel()"></v-card-text>
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
