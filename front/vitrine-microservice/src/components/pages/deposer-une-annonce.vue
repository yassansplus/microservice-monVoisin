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
                     class=" is-12">
              <b-input type="text"
                       v-model="annonceModel.titre"
                       placeholder="Je vais réparer votre tondeuse à gazon"
                       maxlength="255">
              </b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <b-field label="Catégorie de l'annonce" :label-position="labelPosition">
              <b-select aria-required="true" required v-model="annonceModel.categorie"
                        placeholder="Séléctionner une catégorie pour votre annonce">
                <option
                    v-for="categorie in categories"
                    :value="'api/categories/'+categorie.id"
                    :key="categorie.id">
                  {{ categorie.label }}
                </option>
              </b-select>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <b-field label="Prix en €"
                     :label-position="labelPosition"
                     class=" is-12">
              <b-input type="number"
                       min="0"
                       v-model="annonceModel.prix"
                       maxlength="50">
              </b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <b-field label="Description" :label-position="labelPosition">
              <b-input maxlength="200" v-model="annonceModel.description" type="textarea"></b-input>
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
import routeList from '../../entity/routeList'
import formModal from './formModal'
import annonceModel from '../../entity/annonce'

export default {
  name: 'deposerUneAnnonce',
  components: {
    'form-modal': formModal
  },
  data: function () {
    return {
      labelPosition: 'on-border',
      waitRequest: false,
      categories: [],
      annonceModel

    }
  },
  beforeMount() {
    axios.get(routeList.categories)
        .then(res => {
          console.log(res.data);
          this.categories = res.data
        }).catch(e => {
      if (e.response.data.status) {
        console.log("error");
      }
    });
  },
  methods: {
    createAnnonce() {
      annonceModel.userId = JSON.parse(this.$cookie.get('user')).id;
      let weCanSendTheReq = true;
      let elementTocomplete = '';
      for (const element in annonceModel) {
        if (annonceModel[element] === undefined || annonceModel[element] === "") {
          elementTocomplete = element;
          weCanSendTheReq = false;
          break;
        }
      }

      if (weCanSendTheReq) {
        annonceModel.prix = parseInt(annonceModel.prix);
        axios.post(routeList.annonces, annonceModel).then(() => {
          this.$buefy.toast.open({
            duration: 3000,
            message: `🥳 TADAAAA 🥳, Votre annonce est désormais publié suivez la dans votre profil!`,
            type: 'is-success'
          });
          this.$router.push('/mes-annonces');
        }).catch(err => console.error("oops grosse erreur", err));
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: `Il semblerait qu'il y ai une erreur dans le formulaire. veuillez remplir le champ ${elementTocomplete}`,
          type: 'is-danger'
        });
      }


    }
  },
}


</script>
