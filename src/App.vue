<template>
    <div class="app">
        <h1 class="title is-1">Hue Speech</h1>
        <speech></speech>
    </div>
</template>

<script>
import Speech from './components/Speech/Speech.vue';

export default {
    name: 'app',
    components: { 
        Speech,
    },
    data () {
        return {}
    }
}
</script>

<style scoped>
    .app {
        text-align: center;
    }
</style>
