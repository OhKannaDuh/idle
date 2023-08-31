<template>
    <div class="row q-pa-md">
        <p class="text-h6 fill-width q-ma-none title">Actions</p>
    </div>
    <div class="row q-pa-md">
        <action-button label="Gather Wood" :resource="getResource('wood')" />
        <action-button label="Gather Food" :resource="getResource('food')" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ActionButton from 'src/components/ActionButton.vue';
import Game from 'src/Game/Game';
import Resource from 'src/Game/Resource';

export default defineComponent({
    name: 'ActionsSection',

    components: {
        ActionButton,
    },

    props: {
        game: {
            type: Game,
            required: true,
        }
    },

    methods: {
        getResource(key: string): Resource {
            return this.game.getResources().get(key) as Resource;
        }
    }

});
</script>

<style>
.fill-width {
    width: 100%;
}
</style>