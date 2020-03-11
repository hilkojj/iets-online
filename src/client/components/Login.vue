<template>

    <div>
        Your username:
        <input v-model="name" type="text" @keypress.enter="login">
        <button @click="login">Play</button>
    </div>

</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        methods: {
            login() {
                console.log(this.name)



            }
        }
    });
</script>

<style scoped lang="sass">
    *
        color: white

</style>