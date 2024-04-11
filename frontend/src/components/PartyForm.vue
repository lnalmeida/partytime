<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <span class="loader" v-if="this.isFetching"></span>
        <form id="party-form" enctype="multipart/form-data" @submit="page === 'newparty' ? createParty($event) : updateParty($event)">
            <input type="hidden" name="id" id="id" v-model="id" />
            <input type="hidden" name="user_id" id="user_id" v-model="user_id" />
            <div class="input-container">
                <label for="title">Título do evento:</label>
                <input type="text" name="title" id="title" v-model="title" placeholder="Digite o Título do seu evneto" @blur="enableControl"/>
            </div>
            <div class="input-container">
                <label for="description">O que vai rolar no evento:</label>
                <textarea rows="5" type="text" name="description" id="description" v-model="description" placeholder="Descreva seu evento, incluindo local, hora atrações e mais" @blur="enableControl"></textarea>
            </div>
            <div class="input-container">
                <label for="party_date">Data do evento:</label>
                <input type="date" name="party_date" id="party_date" v-model="party_date" @blur="enableControl"/>
            </div>
            <div class="input-container">
                <label for="photos">Imagens:</label>
                <label for="photos" class="file-input">
                    <span>Selecionar arquivos</span>
                    <input disabled type="file" multiple="multiple" name="photos" id="photos" ref="file" @change="onChange"/>
                </label>
            </div>
            <div v-if="page === 'editparty' && showMiniImages" class="mini-images">
                <p>Imagens atuais:</p>
                <img v-for="(photo, index) in photos" :src="`${photo}`" :key="index">
            </div>
            <div class="input-container">
               <label for="is_private">Tipo do evento:</label>
               <label class="toggler-wrapper style-23">
                    <input type="checkbox" name="is_private" ref="privacy" id="is_private" v-model="is_private" />
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
            is_private: this.party.isPrivate || false,
            user_id: this.party.userId || null,
            msg: null,
            msgClass: null,
            showMiniImages: true,
            isFetching: false,
            isFormValid: false
        }
    },
    methods: {
        enableControl(e){
            if(title && description && this.party_date) {
                document.querySelector("input[type='file']").disabled = false;
            } else {
                 document.querySelector("input[type='file']").disabled = true;
            }
        },
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
        
            if(this.photos.length > 0) {
                for(const i of Object.keys(this.photos)) {
                    formData.append('photos', this.photos[i]);
                };
            };

            this.isFetching = true;
            await fetch(baseUrl, {
                method: "POST",
                headers: headers,
                body: formData
            })
            .then(resp => resp.json())
            .then(data => {
                let success = false;

                if(data.error) {
                    this.isFetching = false;
                    this.msg = data.error;
                    this.msgClass = "error";
                } else {
                    success = true;
                    this.isFetching = false
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

    /* loader css 2 */
/*     
    .loader {
          width: 20px;
          height: 58px;
          display: inline-block;
          position: relative;
          border: 2px solid #FFF;
          box-sizing: border-box;
          color: rgba(255, 61, 0, 0.9);
          border-radius: 20px 20px 4px 4px;
          background: #fff;
          animation: fill 2s linear infinite alternate;
        }
        .loader::after {
          content: '';
          box-sizing: border-box;
          position: absolute;
          left: 50%;
          top: 0%;
          transform: translate(-50% , -95%);
          border: 2px solid #FFF;
          border-bottom: none;
          background: #fff;
          width: 10px;
          height: 20px;
          animation: fillNeck 2s linear infinite alternate;
        }

        @keyframes fill {
          0% { box-shadow: 0 0  inset }
          50% , 100% { box-shadow: 0 -98px inset }
        }


        @keyframes fillNeck {
          0% , 50%{ box-shadow: 0 0  inset }
          100% { box-shadow: 0 -20px inset }
        }
     */

    /* loader CSS 1 */
    /* .loader {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: inline-block;
        border-top: 4px solid #FFF;
        border-right: 4px solid transparent;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        }
        .loader::after {
        content: '';  
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border-left: 4px solid #FF3D00;
        border-bottom: 4px solid transparent;
        animation: rotation 0.5s linear infinite reverse;
        }
        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }  */


    /* Loader CSS 3 */

    .loader {
        width: 175px;
        height: 80px;
        display: block;
        margin: auto;
        background-image: radial-gradient(circle 25px at 25px 25px, #FFF 100%, transparent 0), radial-gradient(circle 50px at 50px 50px, #FFF 100%, transparent 0), radial-gradient(circle 25px at 25px 25px, #FFF 100%, transparent 0), linear-gradient(#FFF 50px, transparent 0);
        background-size: 50px 50px, 100px 76px, 50px 50px, 120px 40px;
        background-position: 0px 30px, 37px 0px, 122px 30px, 25px 40px;
        background-repeat: no-repeat;
        position: relative;
        box-sizing: border-box;
    }
    .loader::after {
        content: '';  
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
        position: absolute;
        border: 15px solid transparent;
        border-top-color: #3f8ce9;
        box-sizing: border-box;
        animation: fadePush 1s linear infinite;
    }
    .loader::before {
        content: '';  
        left: 50%;
        bottom: 30px;
        transform: translate(-50%, 0);
        position: absolute;
        width: 15px;
        height: 15px;
        background: #3f8ce9;
        box-sizing: border-box;
        animation: fadePush 1s linear infinite;
    }

    @keyframes fadePush {
        0% {
            transform: translate(-50%, -15px);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, 0px);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, 15px);
            opacity: 0;
        }
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
    	background-color: #eb4f37;
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
    	border-color: #eb4f37;
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
    	background-color: #eb4f37;
    }

    .toggler-wrapper.style-23 .toggler-slider {
    	background-color: transparent;
    	border: 2px solid #44cc66
    }

    .toggler-wrapper.style-23 .toggler-slider:before {
    	content: 'Privado';
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
    	content: 'Público';
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
    	background-color: #44cc66;
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