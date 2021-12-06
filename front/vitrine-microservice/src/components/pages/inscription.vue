<template>
  <div>
    <div>
      <div class="card card-inscription column is-4 is-offset-4">
        <div class="card-content">
          <div class="content">
            <h1 class="has-text-centered">Inscription</h1>
            <form ref="form-sign-in" method="post" :action="routeList.user">
              <div class="columns">
                <b-field label="Nom" :label-position="labelPosition" class="column is-6">
                  <b-input v-model="user.nom" placeholder="Garvey"></b-input>
                </b-field>
                <b-field label="Prenom" :label-position="labelPosition" class="column is-6">
                  <b-input v-model="user.prenom" placeholder="Kevin"></b-input>
                </b-field>
              </div>
              <div class="columns">
                <b-field label="Email"
                         :label-position="labelPosition"
                         class="column is-6">
                  <b-input v-model="user.email" type="email"
                           placeholder="JohnDoe@"
                           maxlength="50">
                  </b-input>
                </b-field>
                <b-field label="Password"
                         class="column is-6"
                         :label-position="labelPosition"
                >
                  <b-input v-model="user.password" minlength="8" type="password" placeholder="mot de passe"
                           maxlength="30"></b-input>
                </b-field>
              </div>

              <div class="columns">
                <vue-google-autocomplete
                    id="map"
                    placeholder="Start typing"
                    class="column is-12"
                    :country="['fr']"
                    v-on:placechanged="getAddressData"
                >
                </vue-google-autocomplete>
              </div>
              <div class="columns">
                <b-button type="is-primary" @click="submit">S'inscrire</b-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import user from '../../entity/user';
import axios from 'axios';
import routeList from '../../entity/routeList'

const submit = function () {
  const method = this.$refs["form-sign-in"].method;
  const url = this.$refs["form-sign-in"].action;
  const headers = {"Content-type": 'Application/json'}

  console.log(user);
  axios({method, url, headers, data: user})
      .then(res => {
        this.$buefy.toast.open({
          duration: 3000,
          message: `✅ et une bonne chose de faites ${res.data.prenom}, vous voilà inscris!`,
          type: 'is-success'
        });
        //Après une inscription réussis on connecte l'utilisateur courant
        axios.post(routeList.login, {email: user.email, password: user.password})
            .then(res => this.$cookie.set("token", res.data.token,))

      }).catch(err => err.response.data["violations"].forEach(e => this.$buefy.toast.open({
        duration: 3000,
        message: e.message,
        type: 'is-warning'
      })
  ))
};
export default {
  name: 'inscription',
  methods: {
    submit,
    getAddressData: function (addressData) {
      this.user.adresse = addressData;
    }
  },

  data: function () {
    return {
      routeList,
      user,
      adress: "",
      labelPosition: 'on-border',
    }
  },
  components: {
    VueGoogleAutocomplete
  }
}
</script>

<style>
.card-inscription {
  margin-top: 10%;
}
</style>
