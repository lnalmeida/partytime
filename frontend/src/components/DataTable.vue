<template>
    <data-container>
        <Message :msg="msg" :msgClass="msgClass" />
        <div class="content-wrapper"> 
            <div class="news-card" v-for="(party, index) in parties" :key="index">
                <a href="#" class="news-card__card-link"></a>
                    <img :src="party.photos[0]" alt="" class="news-card__image">
                    <div class="news-card__text-wrapper">
                      <h2 class="news-card__title">{{party.title}}</h2>
                      <div class="news-card__post-date">{{ party.partyDate.split("T")[0] }}</div>
                      <div class="news-card__details-wrapper">
                        <p class="news-card__excerpt">{{ party.description }}&hellip;</p>
                        <div class="actions-wrapper">
                            <router-link class="news-card__show_button" :to="`/party/${party._id}`">
                                <div class="show_button">
                                    <i class="bx bx-show"></i>
                                    <p>Ver</p>
                                </div>
                            </router-link>
                            <a href="#" class="news-card__delete_button" @click="remove(party._id)">
                                <div class="delete_button">
                                    <i class="bx bx-trash"></i>
                                    <p>Excluir</p>
                                </div>
                            </a>
                        </div>
                      </div>
                    </div>
            </div>
        </div>

    </data-container>
</template>

<script>
import Message from './Message.vue';

    export default {
        name: "DataTable",
        props: ["parties"],
        components: {
            Message
        },
        data() {
            return {
                msg: null,
                msgClass: null
            }
        }, 
        methods: {
            async remove(id) {
                const baseUrl = process.env.VUE_APP_PARTIES_BASE_URL;
                const token = this.$store.getters.token;
                const headers= {"auth-token": token};
                await fetch(`${baseUrl}/${id}`, {
                    method: "DELETE",
                    headers,
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
                        this.$parent.getPartiesByUser();
                        this.msg = null;
                    }, 2000)
                })
                .catch(error => console.log(error.message));
            }
        }
    }
</script>

<style scoped>

    .actions-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .delete_button {
        color: #f1f18f;
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 1.2rem;
        justify-content: space-around;
        transition: all 0.5s;
    }

    .delete_button:hover {
        color: #ed4141;
    }

    .show_button {
        color: #f1f18f;
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 1.2rem;
        justify-content: space-around;
        transition: all 0.5s;
    }

    .show_button:hover {
        color: #7d8cec;
    }

    .content-wrapper {
        margin: 0 auto;
        max-width: 1200px;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        padding: 0.5rem;
    }

    .news-card {
        border: 0px solid aqua;
        margin: 0.5rem;
        position: relative;
        height: 12rem;
        overflow: hidden;
        border-radius: 0.5rem;
        flex: 1;
        min-width: 290px;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
    }

    @media (min-width: 900px) {
        .news-card {
            height: 20rem
        }
    }

    .news-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0) linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 80%);;
        z-index: 0;
    }

    .news-card__card-link {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    /*     background: rgba(255,0,0,.5); */
    }

    .news-card__image {
        width: fit-content;
        height: auto;
        display: block;
        object-fit: cover;
        transition: transform 3s ease;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        position: relative;
        z-index: -1;
    }

    .news-card__text-wrapper {
        width: 100%;
        position: absolute;
        bottom: 0rem;
        padding: 1rem;
        color: white;
    /*     background-color: rgba(0, 0, 0, 0.4); */
        transition: background-color 1.5s ease;
    }

    .news-card__title {
        transition: color 1s ease;
        margin-bottom: .5rem;
    }

    .news-card__post-date {
        font-size: .7rem;
        margin-bottom: .5rem;
        color: #CCC;
    }

    .news-card__details-wrapper {
        max-height: 0;
        opacity: 0;
        transition: max-height 1.5s ease, opacity 1s ease;
    }

    @media (min-width: 900px) {
        .news-card:hover .news-card__details-wrapper {
          max-height: 20rem;
          opacity: 1;
        }
        .news-card:hover .news-card__text-wrapper {
          background-color: rgba(0, 0, 0, 0.6);
        }
        .news-card:hover .news-card__title {
          color: yellow;
        }
        .news-card:hover .news-card__image {
          transform: scale(1.2);
          z-index: -1;
        }
    }
     .news-card__excerpt {
        font-weight: 300;
    }
    .news-card__delete_button {
        background: black;
        color: #bbb;
        display: block;
        padding: 0.4rem 0.6rem;
        border-radius: 0.3rem;
        margin-top: 1rem;
        border: 1px solid #444;
        font-size: 0.8rem;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        text-decoration: none;
        width: 7rem;
        margin-left: auto;
        position: relative;
        z-index: 5;
    }

    .news-card__show_button {
        background: black;
        color: #bbb;
        display: block;
        padding: 0.4rem 0.6rem;
        border-radius: 0.3rem;
        margin-top: 1rem;
        border: 1px solid #444;
        font-size: 0.8rem;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        text-decoration: none;
        width: 7rem;
        margin-right: auto;
        position: relative;
        z-index: 5;
    }

</style>