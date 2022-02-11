<template>
  <form-modal>
    <template v-slot:form>
      <form action="" method="post" slot="form">
        <div class="columns">
          <div class="column">
            <b-field label="Email"
                     :label-position="labelPosition"
                     class=" is-12">
              <b-input type="email"
                       placeholder="JohnDoe@"
                       v-model="user.email"
                       maxlength="50">
              </b-input>
            </b-field>
            <b-field label="Password"
                     class=" is-12"
                     :label-position="labelPosition"
            >
              <b-input minlength="8"
                       v-model="user.password"
                       type="password"
                       placeholder="mot de passe"
                       maxlength="30"></b-input>
            </b-field>
          </div>

        </div>
        <b-button type="is-primary" @click="login()">Connexion</b-button>
        <b-loading :is-full-page="true" v-model="waitRequest" :can-cancel="false"></b-loading>

      </form>

    </template>

  </form-modal>

</template>
<script>
import axios from 'axios';
import routeList from '../../entity/routeList'
import user from '../../entity/user';
import formModal from './formModal'

export default {
  name: 'inscription',
  components: {
    'formModal': formModal
  },

  mounted() {
    if (this.$store.state.notAuthorized !== null) {
      this.$buefy.toast.open({
        duration: 3000,
        message: this.$store.state.notAuthorized,
        type: 'is-danger'
      });
    }
  },
  methods: {
    login: function () {
      this.waitRequest = true;
      axios.post(routeList.login, {email: user.email, password: user.password})
          .then(res => {
            this.waitRequest = false;
            this.$cookie.set('refresh_token', res.data.refresh_token);
            this.$cookie.set('token', res.data.token);
            //TODO: Dans le back renvoyer le user formater pour s'eviter les opération en plus ici
            this.$cookie.set('user', atob(res.data.token.split(".")[1]));
            this.$store.commit('setUser', this.$cookie.get('user'));
            this.$router.push('/profil');
          }).catch(() => {
            this.waitRequest = false;
        this.$buefy.toast.open({
          duration: 3000,
          message: "Une erreur est survenu.",
          type: 'is-warning'
        })
      })

    }
  },
  data: function () {
    return {
      labelPosition: 'on-border',
      message: "",
      user,
      waitRequest: false,
      show: false,
      posts: [1, 2, 3]
    }
  },
}
</script>

<style>
.card-inscription {
  margin-top: 10%;
}
</style>
