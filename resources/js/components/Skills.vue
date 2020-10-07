<template>
    <v-container fluid ma-0 :class="{hidden: !visible}">
        <v-row dense>
            <v-col cols="3" v-for="(skill,identifier) in player.getSkills()" :key="identifier">
                <v-card :id="skill.getId(identifier)" class="skill" tile flat>
                    <v-card-text>
                        <v-row no-gutters>
                            <v-col class="flex-grow-1">
                                <i class="ra ra-fw" :class="skill.getIcon()"></i>
                            </v-col>
                            <v-col class="flex-grow-1">
                                <span> {{ skill.getLevel() }} / 99</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
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
