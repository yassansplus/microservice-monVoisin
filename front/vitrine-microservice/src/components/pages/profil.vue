<template>
  <div class="container">
    <section class="header">
      <div class="columns">
        <div class="column is-2 ">
          <b-image
              class="user-profil-pic"
              :src="'https://via.placeholder.com/350x350'"
              alt="The Buefy Logo"
              :rounded="true"
          ></b-image>
        </div>
        <div class="column is-10 user-information">
          <div>
            {{ user.nom }}
          </div>
          <div>
            {{ user.prenom }}
          </div>
          <div>
            <b-rate
                :value="4"
                custom-text="Satisfaction de vos voisins"></b-rate>
          </div>
        </div>
      </div>

      <img src="" alt="" class="profil-image is-rounded">
    </section>
    <hr>
    <section class="body-profil">
      <div class="columns is-multiline">
        <div class="column is-4" v-for="(card,index) in cards" :key="index">
          <router-link :to="card.link">
            <card-profil
                :title="card.title"
                :icon="card.icon"
                :link="card.link"
                :caption="card.caption"
            ></card-profil>
          </router-link>
        </div>
      </div>

    </section>
  </div>
</template>
<script>

import axios from "axios";
import routeList from '../../entity/routeList'
import cardProfil from '../element/card-profil'
import userModel from '../../entity/user'

export default {
  data: function () {
    return {
      user : userModel,
      cards: [
        {
          caption: "Voir vos annonces publiées",
          icon: "store",
          link: "/mes-annonces",
          title: 'Annonces'
        },
        {
          caption: "Les annonces auxquel j'ai fais une demande",
          icon: "fill-drip",
          link: "/mes-demandes",
          title: 'Mes demandes'
        },
        {
          caption: "Toutes vos transactions",
          icon: "credit-card",
          link: "/mes-transactions",
          title: 'Transactions'
        },
        {
          caption: "Paramètres de l'application",
          icon: "cogs",
          link: "/parametres",
          title: 'Paramètres'
        },
        {
          caption: "Mettez à jour votre mot de passe",
          icon: "user-shield",
          link: "/mes-annonces",
          title: 'Sécurité'
        },

      ]
    }
  },
  methods: {
    success() {
      this.$buefy.toast.open({
        message: 'Thanks for you Rate!',
        type: 'is-success'
      })
    }
  },
  beforeMount() {
    const userId = JSON.parse(this.$cookie.get('user')).id;
    axios.get(routeList.user + '/' + userId).then(res => this.user = res.data)
  },
  components: {
    cardProfil
  },
}
</script>
<style>
.user-information {
  margin-top: 120px;
}

.user-information div {
  font-size: 20px;
}

.user-profil-pic {
  max-width: 150px;
  margin-top: 70px;
}
</style>
