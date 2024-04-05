<template>
 <div id="nav">
    <router-link to="/" id="logo-container">
        <img src="/img/party_logo.png" alt="Party Time logo" />
    </router-link>
    <h1 id="nav-title">Party Time</h1>
    <div id="nav-links">
        <router-link to="/">Home</router-link> 
        <router-link to="/login" v-show="!isAuthenticated">Entrar</router-link>
        <router-link to="/register" v-show="!isAuthenticated">Registrar</router-link>
        <router-link to="/dashboard" v-show="isAuthenticated">Dashboard</router-link>
        <router-link to="/profile" v-show="isAuthenticated">Configurações</router-link>
        <button @click="logout($event)" v-show="isAuthenticated">Logout</button>
    </div>
 </div>
</template>

<script>
import { mapState } from 'vuex';

    export default {
        name: "Navbar",
        methods: {
            logout(e) {
                e.preventDefault();

                //emet event too logout user
                this.$store.commit("logout");
                //redirect to home
                this.$router.push("/");
            }
        }, computed: {
            ...mapState([
                'isAuthenticated'
            ])
        }
    }
</script>

<style scoped>
    #nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem;
        border: 1px solid #EEE;
    }

    #nav a {
        text-decoration: none;
        margin-right: 1rem;
    }

    #nav img {
        width: 7.25rem;
    }

    #nav-title {
        font-size: 3rem;
        font-weight: 300;
    }

    #logo-container, #nav-links {
        width: 400px;
    }

    #nav-links {
        display: flex;
        justify-content: flex-end;
    }

    button {
        background-color: #FFF;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        padding: 0  0.625rem;
    }

    button:hover {
        color: #d84919;
    }
</style>


