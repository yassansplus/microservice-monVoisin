<template>
  <div>
    <b-navbar>
      <template>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
              src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
          >
        </b-navbar-item>
      </template>
      <template>
        <b-navbar-item>
          <router-link to="/"> Accueil</router-link>
        </b-navbar-item>
        <b-navbar-item>
          <router-link to="/deposer-une-annonce"> Déposer une annonce</router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
          Rechercher une annonce
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>

      </template>

      <template>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>s'inscrire</strong>
            </a>
            <a class="button is-light">
              Se connecter
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>

</template>
<script>
export default {
  name: 'navbar',
  methods: {
    clickMe() {
      this.$buefy.notification.open('Clicked!!')
    }
  }
}
</script>
