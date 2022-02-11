<template>
  <div class="container">
    <section class="header">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <b-carousel :indicator-inside="false">
            <b-carousel-item v-for="(item, i) in 6" :key="i">
              <b-image class="image" :src="getImgUrl(i)"></b-image>
            </b-carousel-item>
            <template #indicators="props">
              <b-image class="al image" :src="getImgUrl(props.i)" :title="props.i"></b-image>
            </template>
          </b-carousel>
        </div>
      </div>

    </section>
    <section class="user-action">
      <owner-annonce-cta v-if="isMyOwn" :is-editing="editMode" :annonce-id="annonce.id"
                         v-on:editMode="updateEdit()"></owner-annonce-cta>
      <annonce-cta v-else></annonce-cta>

    </section>
    <section class="body">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <h1 v-if="!editMode"> {{ annonce.titre }}</h1>
          <b-field label="Name" v-if="editMode" :label-position="'on-border'">
            <b-input v-model="annonce.titre"></b-input>
          </b-field>

        </div>
      </div>


      <div class="columns">
        <div class="column is-10 is-offset-1">
          <h5 v-if="!editMode">Catégorie: {{ annonce.categorie.label }}</h5>
          <b-field v-if="editMode" label="Catégorie de l'annonce" :label-position="'on-border'">
            <b-select aria-required="true" required v-model="annonce.categorie"
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
        <div class="column is-4 is-offset-1">
          <p v-if="!editMode">
            {{ annonce.description }}
          </p>
          <b-field label="Message"
                   v-if="editMode"
                   :label-position="'on-border'">
            <b-input maxlength="200" type="textarea" v-model="annonce.description"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns" v-if="editMode">
        <div class="column is-offset-1">
          <b-button type="is-success" outlined @click="confirmEdit">Enregistrer</b-button> &nbsp;
          <b-button type="is-warning" outlined @click="cancelUpdate">Annulé</b-button>

        </div>
      </div>
    </section>
  </div>

</template>
<script>
import ownerAnnonceCta from '../element/owner-annonce-cta'
import annonceCta from '../element/annonce-cta'
import axios from "axios"
import routeList from '../../entity/routeList'
import annonceModel from '../../entity/annonce'
//TODO: verifier pourquoi le Clone de l'objet ne fonctionne pas à l'annulation de l'edition
export default {
  data: function () {
    return {
      isMyOwn: false,
      annonce: annonceModel,
      editMode: false,
      currentAnnonce: {},
      categories: {}
    }
  },
  beforeMount() {
    const annonceId = this.$route.params.id;
    this.isMyOwn = this.$route.name === 'mon-annonce';
    axios.get(routeList.annonces + '/' + annonceId).then(res => {
      console.log(res.data);
      this.annonce = res.data;
    })
  },
  computed: {},
  methods: {
    updateEdit() {
      this.editMode = !this.editMode;
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
    confirmEdit() {
      const annonceId = this.$route.params.id;
      axios.put(routeList.annonces + '/' + annonceId, this.annonce).then(res => {
        this.annonce = res.data;
        this.editMode = !this.editMode;

      });
    },
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`
    },
    deleteAnnonce() {
      return 'annonce supprimé'
    },
    cancelUpdate() {
      const annonceId = this.$route.params.id;
      axios.get(routeList.annonces + '/' + annonceId).then(res => {
        this.annonce = res.data;
      });
      this.editMode = false
    }
  },
  components: {
    ownerAnnonceCta,
    annonceCta
  }
}
</script>
<style>
h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #7957d5;
}

.card {
  cursor: pointer;
}
</style>
