<template>
    <p class="msg" :class="msgClass" v-if="msg">{{ msg }}</p>
</template>

<script>
    export default {
        name: "Message",
        props: ["msg", "msgClass"]
    }
</script>

<style>
    .msg {
        max-width: 500px;
        margin: 1.25rem auto;
        padding: 1.25rem;
        text-align: center;
        border: 1px solid #CCC;
        border-radius: 5px;
        font-weight: bold;
    }

    .success {
        color: #155724;
        background-color: #D4EDDA;
        border-color: #C3E6CB;
    }

    .error {
        color: #721C24;
        background-color: #F8D7DA;
        border-color: #F5C6CB;
    }
</style>