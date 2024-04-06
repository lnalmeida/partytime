<template>
    <div class="new-party">
        <h1>Adicione seu evento:</h1>
        <PartyForm :party="{}" page="newparty" btnText="Criar evento"/>
    </div>
</template>

<script>
    import PartyForm from "../components/PartyForm.vue";

    export default {
        components: {
            PartyForm
        }
    }
</script>

<style scoped>
    .new-party {
        text-align: center;
        padding-top: 2.5rem;
        padding-bottom: 2.25rem;
    }

    .new-party h1 {
        margin-bottom: 2.5rem;
    }
</style>
