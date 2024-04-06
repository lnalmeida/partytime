<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <form id="party-form" enctype="multipart/form-data" @submit="page === 'newparty' ? createParty($event) : updateParty($event)">
            <input type="hidden" name="id" id="id" v-model="id" />
            <input type="hidden" name="user_id" id="user_id" v-model="user_id" />
            <div class="input-container">
                <label for="title">Título do evento:</label>
                <input type="text" name="title" id="title" v-model="title" placeholder="Digite o Título do seu evneto" />
            </div>
            <div class="input-container">
                <label for="description">O que vai rolar no evento:</label>
                <textarea rows="5" type="text" name="description" id="description" v-model="description" placeholder="Descreva seu evento, incluindo local, hora atrações e mais"></textarea>
            </div>
            <div class="input-container">
                <label for="party_date">Data do evento:</label>
                <input type="date" name="party_date" id="party_date" v-model="party_date" />
            </div>
            <div class="input-container">
                <label for="photos">Imagens:</label>
                <label for="photos" class="file-input">
                    <span>Selecionar arquivos</span>
                    <input type="file" multiple="multiple" name="photos" id="photos" ref="file" @change="onChange"/>
                </label>
            </div>
            <div v-if="page === 'editparty' && showMiniImages" class="mini-images">
                <p>Imagens atuais:</p>
                <img v-for="(photo, index) in photos" :src="`${photo}`" :key="index">
            </div>
            <div class="input-container">
               <label for="is_private">Tipo do evento:</label>
               <label class="toggler-wrapper style-23">
                    <input type="checkbox" name="is_private" id="is_private" v-model="is_private">
                    <div class="toggler-slider">
                      <div class="toggler-knob"></div>
                    </div>
                </label>
            </div>
            <InputSubmit :text="btnText" />
        </form>
    </div>
</template>

<script>
import Message from './Message.vue';
import InputSubmit from './form/InputSubmit.vue';

export default {
    name: "PartyForm",
    props: ["party", "page", "btnText"],
    components: {
        Message,
        InputSubmit
    },
    data() {
        return {
            id: this.party._id || null,
            title: this.party.title || null,
            description: this.party.description || null,
            party_date: this.party.partyDate || null,
            photos: this.party.photos || [],
            is_private: this.party.isPrivate || null,
            user_id: this.party.userId || null,
            msg: null,
            msgClass: null,
            showMiniImages: true
        }
    },
    methods: {
        onChange(e) {
            this.photos = e.target.files;
            this.showMiniImages = false;
        },
        async createParty(e){
            e.preventDefault();
            const baseUrl = process.env.VUE_APP_PARTIES_BASE_URL;
            const token = this.$store.getters.token;
            const headers = {"auth-token": token};
            
            const formData = new FormData();
        
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('party_date', this.party_date);
            formData.append('is_private', this.is_private);
            formData.append('photos', this.photos);

            if(this.photos.length > 0) {
                for(const i of Object.keys(this.photos)) {
                    formData.append('photos', this.photos[i]);
                };
            };

            console.log(this.photos)


            await fetch(baseUrl, {
                method: "POST",
                headers: headers,
                body: formData
            })
            .then(resp => resp.json())
            .then(data => {
                let success = false;

                if(data.error) {
                    this.msg = data.error;
                    this.msgClass = "error";
                } else {
                    success = true;
                    this.msg = data.message;
                    this.msgClass = "success";
                }

                setTimeout(() => {
                    if(!success) {
                        this.msg = null;
                    } else {
                        //redirect to dashboard
                        this.$router.push("dashboard");
                    };
                }, 2000)

            })
            .catch(error => console.log(error));


        },
        async updateParty(e) {
            e.preventDefault();
            console.log("Party updated");
        }
    }
}

</script>

<style scoped>
    /* form CSS */
    #party-form {
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

    .input-container input,
    .input-container textarea {
        padding: 0.625rem;
        border: 1px solid #E8E8E8;
        border-radius: 4px;
    }

    .input-container input:focus,
    .input-container textarea:focus {
        background-color: #d3effd;
        outline: 2px solid #7e94f5;
        font-weight: 400;
    }

    /* input file CSS */
    .file-input {
      display: inline-block;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .file-input input[type="file"] {
      position: absolute;
      font-size: 100px;
      opacity: 0;
      right: 0;
      top: 0;
    }

    .file-input span {
      display: inline-block;
      background-color: #007bff;
      color: #fff;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: all .5s;
      font-weight: 400;
    }

    .file-input:hover span {
      background-color: #0056b3;
    }

    /* checkbox CSS */
    .toggler-wrapper {
    	display: block;
    	width: 45px;
    	height: 25px;
    	cursor: pointer;
    	position: relative;
    }

    .toggler-wrapper input[type="checkbox"] {
    	display: none;
    }

    .toggler-wrapper input[type="checkbox"]:checked+.toggler-slider {
    	background-color: #44cc66;
    }

    .toggler-wrapper .toggler-slider {
    	background-color: #ccc;
    	position: absolute;
    	border-radius: 100px;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 100%;
    	-webkit-transition: all 300ms ease;
    	transition: all 300ms ease;
    }

    .toggler-wrapper .toggler-knob {
    	position: absolute;
    	-webkit-transition: all 300ms ease;
    	transition: all 300ms ease;
    }
    .toggler-wrapper.style-23 input[type="checkbox"]:checked+.toggler-slider {
    	background-color: transparent;
    	border-color: #44cc66;
    }

    .toggler-wrapper.style-23 input[type="checkbox"]:checked+.toggler-slider:before {
    	-webkit-transform: translateY(0);
    	transform: translateY(0);
    	opacity: 0.7;
    }

    .toggler-wrapper.style-23 input[type="checkbox"]:checked+.toggler-slider:after {
    	opacity: 0;
    	-webkit-transform: translateY(20px);
    	transform: translateY(20px);
    }

    .toggler-wrapper.style-23 input[type="checkbox"]:checked+.toggler-slider .toggler-knob {
    	left: calc(100% - 19px - 3px);
    	background-color: #44cc66;
    }

    .toggler-wrapper.style-23 .toggler-slider {
    	background-color: transparent;
    	border: 2px solid #eb4f37;
    }

    .toggler-wrapper.style-23 .toggler-slider:before {
    	content: 'Público';
    	position: absolute;
    	top: 4px;
    	right: -70px;
    	font-size: 75%;
        font-weight: 600;
    	text-transform: uppercase;
    	opacity: 0;
    	-webkit-transition: all 300ms ease;
    	transition: all 300ms ease;
    	-webkit-transform: translateY(-20px);
    	transform: translateY(-20px);
    }

    .toggler-wrapper.style-23 .toggler-slider:after {
    	content: 'Privado';
    	position: absolute;
    	top: 4px;
    	right: -70px;
    	font-size: 75%;
        font-weight: 600;
    	text-transform: uppercase;
    	opacity: 0.7;
    	-webkit-transition: all 300ms ease;
    	transition: all 300ms ease;
    }

    .toggler-wrapper.style-23 .toggler-knob {
    	width: calc(25px - 6px);
    	height: calc(25px - 6px);
    	border-radius: 50%;
    	left: 3px;
    	top: 1px;
    	background-color: #eb4f37;
    }

    /* mini-images CSS */
    .mini-images {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 0px;
    }

    .mini-images p {
        width: 100%;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: l;
    }

    .mini-images img {
        height: 3.125rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
    }

</style>