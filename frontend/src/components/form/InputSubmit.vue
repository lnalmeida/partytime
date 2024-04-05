<template>
    <input type="submit" :value="text">
</template>

<script>
    export default {
        name: "InputSubmit",
        props: {
            text: ""
        }
    }
</script>

<style scoped>
    input {
        width: 12.5rem;
        margin: 0 auto;
        text-transform: uppercase;
        color: #FFF;
        background-color: #25282E;
        border: 0;
        border-radius: 4px;
        padding: 0.75rem;
        cursor: pointer;
        transition: .5s;
    }

    input:hover {
        background-color: #141619;
    }
</style>