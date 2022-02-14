<template>
  <div>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
              src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
          >
        </b-navbar-item>
      </template>
      <template #start v-if="isLogged === true">
        <b-navbar-item>
          <router-link to="/"> Accueil</router-link>
        </b-navbar-item>
        <b-navbar-item>
          <router-link to="/deposer-une-annonce"> Déposer une annonce</router-link>
        </b-navbar-item>
        <b-navbar-item>
          <router-link to="/profil">Profil</router-link>
        </b-navbar-item>
        <b-navbar-item href="#" @click="clickMe">
          Contact
        </b-navbar-item>

      </template>

      <template #end v-else-if="isLogged === false">
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link to="/inscription">
              <a class="button is-primary">
                <strong>s'inscrire</strong>
              </a>
            </router-link>
            <router-link to="/connexion">
              <a class="button is-light">
                <strong>se connecter</strong>
              </a>
            </router-link>

          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>

</template>
<script>


export default {
  name: 'navbar',
  components: {},
  data: function () {
    return {}
  },
  computed: {
    isLogged: function () {
      return (this.$store.state.user) !== null;
    }
  },
  methods: {
    clickMe() {
      console.log('ok')
    }
  }
}
</script>
