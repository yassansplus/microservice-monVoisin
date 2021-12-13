<template>
  <div>
    <div>
      <div class="card card-inscription column is-4 is-offset-4">
        <div class="card-content">
          <div class="content">
            <h1 class="has-text-centered">Connexion</h1>
            <form action="" method="post">
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

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import axios from 'axios';
import routeList from '../../entity/routeList'
import user from '../../entity/user';

export default {
  name: 'inscription',
  methods: {
    login: function () {
      axios.post(routeList.login, {email: user.email, password: user.password})
          .then(res => {
            localStorage.setItem('refresh_token', res.data.refresh_token);
            localStorage.setItem('token', "Bearer " + res.data.token);
            console.table()
            localStorage.user = atob(res.data.token.split(".")[1]);
            this.$router.push('/deposer-une-annonce');
          })
    }
  },
  data: function () {
    return {
      labelPosition: 'on-border',
      message: "",
      user,
      show: false,
      posts: [1, 2, 3]
    }
  },
  components: {}
}
</script>

<style>
.card-inscription {
  margin-top: 10%;
}
</style>
