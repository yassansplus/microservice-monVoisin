<template>
  <div>
    <div>
      <div class="card card-inscription column is-4 is-offset-4">
        <div class="card-content">
          <div class="content">
            <h1 class="has-text-centered">Connexion</h1>
            <form action="" method="post">
              <div class="columns">
                <b-field label="Email"
                         :label-position="labelPosition"
                         class="column is-6">
                  <b-input type="email"
                           placeholder="JohnDoe@"
                           maxlength="50">
                  </b-input>
                </b-field>
                <b-field label="Password"
                         class="column is-6"
                         :label-position="labelPosition"
                >
                  <b-input minlength="8" type="password" placeholder="mot de passe" maxlength="30"></b-input>
                </b-field>
              </div>
              <b-button type="is-primary" @click="test()">Connexion</b-button>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  name: 'inscription',
  methods: {
    test: function () {
      console.log("let's goooooo 🏎");
    }
  },
  data: function () {
    return {
      labelPosition: 'on-border',
      message: "",
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
