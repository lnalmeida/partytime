<template>
    <div class="dashboard">
        <div class="title-container">
            <h1>Gerencie seus eventos!</h1>
            <router-link to="/newparty" class="btn">Novo evento</router-link>
        </div>
        <div v-if="parties.length > 0">
            <h1>Tabela de eventos</h1>
        </div>
        <div v-else>
            <p>Você ainda não tem eventos cadastrados, <router-link to="/newparty">clique aqui para cadastrar um novo evento</router-link></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                parties: []
            }
        }
    };
</script>

<style scoped>
    .dashboard {
        padding: 3.125rem;
        padding-bottom: 6.25rem;
    }

    .title-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2.5rem;
    }

    .btn {
        padding: 0.625rem 1rem;
        background-color: #000;
        color: #FFF;
        margin: 0.3125rem;
        text-decoration: none;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 700;
        transition: 0.5s;
    }

    .btn:hover {
        background-color: #141619;
    }
</style>