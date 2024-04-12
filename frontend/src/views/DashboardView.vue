<template>
    <div class="dashboard">
        <div class="title-container">
            <h1>Gerencie seus eventos!</h1>
            <router-link to="/newparty" class="btn">Novo evento</router-link>
        </div>
        <div v-if="parties.length > 0">
            <DataTable :parties="parties"/>
        </div>
        <div v-else>
            <p>Você ainda não tem eventos cadastrados, <router-link to="/newparty">clique aqui para cadastrar um novo evento</router-link></p>
        </div>
    </div>
</template>

<script>
    import {jwtDecode} from "jwt-decode";
    import DataTable from "../components/DataTable.vue";

    export default {
        name: "Dashboard",
        data() {
            return {
                parties: []
            }
        }, 
        components: {
            DataTable
        },
        created() {
            //load All parties of the current user
            this.getPartiesByUser();
        },
        methods: {
            async getPartiesByUser(){
                const baseUrl = process.env.VUE_APP_PARTIES_BASE_URL;
                const token = this.$store.getters.token;
                const headers = {"auth-token": token};
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                fetch(`${baseUrl}/${userId}/all`, {
                    method: "GET",
                    headers
                })
                .then(resp => resp.json())
                .then(data => {
                    if(data && data.partyByUserId){
                        this.parties = data.partyByUserId;
                    }
                    console.log(this.parties);
                })
                .catch(error => console.log({"error": error}));
            },
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