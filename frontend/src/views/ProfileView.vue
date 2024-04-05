<template>
    <div class="profile">
        <h1>Edite seu perfil</h1>
        <UserForm page="Profile" :user="user" :btnText="Editar" :key="componentKey" />
    </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue';

    export default {
        name: "Profile",
        components: {
            UserForm
        },
        data() {
            return {
                user: {},
                componentKey: 0
            }
        },
        created() {
            //load user
            this.getUser()
        },
        methods: {
            async getUser() {
                const id = this.$store.getters.userId;
                const token = this.$store.getters.token;

                const userData = {

                } 

                const baseURL = process.env.VUE_APP_USER_BASE_URL;
                const headers = {
                    "content-type": "application/json",
                    "auth-token": token
                 };

                await fetch(`${baseURL}/${id}`, {
                    method: "GET",
                    headers: headers
                })
                .then( resp => resp.json())
                .then(data => {
                    this.user = data.userById;
                    this.componentKey += 1;
                })
                .catch(error => console.log(error)); 
            }
        }

    };
</script>

<style scoped>
    .profile {
        text-align: center;
        padding-top: 2.5rem;
        padding-bottom: 6.25rem;
    }

    .profile h1 {
        margin-bottom: 2.5rem;
    }
</style>