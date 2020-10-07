<template>
    <v-navigation-drawer v-model="navigation.show" app floating bottom disable-resize-watcher temporary>
        <v-list-item link href="https://github.com/OhKannaDuh/idle/issues" target="_blank">
            <v-list-item-icon>
                <v-icon>mdi-bug</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Report a Bug</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: {
        navigation: Object,
    }
}
</script>
