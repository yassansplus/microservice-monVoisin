<template>
  <form-modal>
    {
    "userId": 0,
    "titre": "string",
    "description": "string",
    "prix": 0,
    "photos": [
    "string"
    ]
    }
    <template v-slot:title>Déposer une annonce</template>
    <template v-slot:form>
      <form action="" method="post" slot="form">
        <div class="columns">
          <div class="column">
            <b-field label="Titre de l'annonce"
                     :label-position="labelPosition"
                     class=" is-6">
              <b-input type="text"
                       placeholder="Je vais réparer votre tondeuse à gazon"
                       maxlength="255">
              </b-input>
            </b-field>
            <b-field label="Prix"
                     :label-position="labelPosition"
                     class=" is-6">
              <b-input type="number"
                       min="0"
                       value="0"
                       maxlength="50">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Description">
              <b-input maxlength="200" type="textarea"></b-input>
            </b-field>

          </div>
        </div>
        <b-button type="is-primary" @click="createAnnonce">Créer mon annonce</b-button>
        <b-loading :is-full-page="true" v-model="waitRequest" :can-cancel="false"></b-loading>

      </form>
    </template>
  </form-modal>
</template>

<script>
import axios from 'axios';
import routeList from './../entity/routeList'
import formModal from './pages/formModal'

export default {
  name: 'HelloWorld',
  components: {
    'form-modal': formModal
  },
  data: function () {
    return {
      labelPosition: 'on-border',
      waitRequest: false,
      categories: [],

    }
  },
  beforeMount() {
    axios.get(routeList.categories)
        .then(res => {
          this.categories = res.data
        }).catch(e => {
      if (e.response.data.status) {
        console.log("error");
      }
    });
  },
  methods: {
    createAnnonce() {
      axios.get(routeList.user + '/44')
          .then(res => {
            console.log(res.data);
          }).catch(e => console.log(e));
    }
  },
}


</script>
