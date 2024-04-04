<template>
 <div id="nav">
    <router-link to="/" id="logo-container">
        <img src="/img/party_logo.png" alt="Party Time logo" />
    </router-link>
    <h1 id="nav-title">Party Time</h1>
    <div id="nav-links">
        <router-link to="/">Home</router-link> 
        <router-link to="/about">Entrar</router-link>
        <router-link to="/about">Registrar</router-link>
    </div>
 </div>
</template>

<script>
    export default {
        name: "Navbar"
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
    }

    button:hover {
        color: #C1B696;
    }
</style>


