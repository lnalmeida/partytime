<template>
    <footer>
       <h3>Party Time &copy; 2024</h3>
       <p>O seu evento na web!</p>
    </footer>
   </template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    footer {
        background-color: #25282E;
        height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    footer h3 {
        color: #FFF;
        margin-bottom: 1rem;
        font-weight: 300;
        font-size: 1.6rem;
    }

    footer p {
        color: #C1B696;
    }
</style>

