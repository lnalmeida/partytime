<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass"/>
        <form id="login-form" @submit="login($event)">
            <div class="input-container">
                <label for="email">E-mail:</label>
                <input type="text" id="email" name="email" v-model="email" placeholder="Digite o seu E-mail">
            </div>
            <div class="input-container">
                <label for="password">Senha:</label>
                <input type="password" id="password" name="password" v-model="password" placeholder="Digite a sua senha">
            </div>
            <InputSubmit text="Entrar" />
        </form>
    </div>
</template>

<script>
    import Message from './Message.vue';
    import InputSubmit from './form/InputSubmit.vue';

    export default {
        name: "LoginForm",
        components: {
            Message,
            InputSubmit
        },
        data() {
            return {
                email: null,
                password: null,
                msg: null,
                mscClass: null
            }
        },
        methods: {
            async login(e){
                e.preventDefault();
                const baseURL = process.env.VUE_APP_AUTH_BASE_URL;
                const headers = {"content-type": "application/json"};
                const userData = {
                    email: this.email,
                    password: this.password,
                };

                const jsonData = JSON.stringify(userData);

                await fetch(`${baseURL}/login`, {
                method: "POST",
                headers: headers,
                body: jsonData
                })
                .then(resp => resp.json())
                .then(data => {
                    let auth = false;

                    if(data.error) {
                        this.msg = data.error;
                        this.msgClass = "error"
                    } else {
                        auth = true;

                        this.msg = data.message;
                        this.msgClass = "success";

                        //emit event for auth an user (vuex)
                        this.$store.commit("authenticate", {token: data.token, userId: data.userId});

                    }

                    setTimeout(() => {
                        if(!auth) {
                            this.msg = null;
                        } else {
                            //redirect to dashboard
                            this.$router.push("dashboard");
                        };
                    }, 2000);
                })
                .catch(error => console.log(error));





            }
        }
    }
</script>

<style scoped>
    #login-form {
        max-width: 25rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        text-align: left;
        
    }

    .input-container label {
        margin-bottom: 0.625rem ;
        color: #555;
    }

    .input-container input {
        padding: 0.625rem;
        border: 1px solid #E8E8E8;
        border-radius: 4px;
    }

    .input-container input:focus {
        background-color: #d3effd;
        outline: 2px solid #7e94f5;
        font-weight: 400;
    }
</style>