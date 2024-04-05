<template>
    <div class="login">
        <h1>Entrar no Party Time</h1>
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
    export default {
        name: "Login",
        components: {
            LoginForm
        }
    };
</script>

<style scoped>
    .login {
        text-align: center;
        padding-top: 2.5rem;
        padding-bottom: 6.25rem;
    }

    .login h1 {
        margin-bottom: 2.5rem;
    }
</style>