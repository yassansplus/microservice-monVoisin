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
      <div v-if="isMyOwn">
        <owner-annonce-cta :is-editing="editMode" :annonce-id="annonce.id"
                           v-on:editMode="updateEdit()"></owner-annonce-cta>
      </div>
      <div @click="prompt" v-else-if="!didUserAnswerToThis">
        <annonce-cta></annonce-cta>
      </div>

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
import roomsModel from '../../entity/rooms'
//TODO: verifier pourquoi le Clone de l'objet ne fonctionne pas à l'annulation de l'edition
export default {
  data: function () {
    return {
      isMyOwn: false,
      annonce: annonceModel,
      rooms: roomsModel,
      editMode: false,
      currentAnnonce: {},
      categories: {},
      didUserAnswerToThis: false,
      user: JSON.parse(this.$cookie.get('user')),
      test: 'test'
    }
  },
  beforeMount() {
    //declaration des variables de vérification
    const annonceId = this.$route.params.id;
    const auteurId = this.annonce.userId;
    const expediteurId = this.user.id;

    //requete pour verifier s'il y a deja une discussion entamer entre les deux
    // TODO: verifier s'il sont deja en contact
    axios.get(routeList.rooms +
        `?annonceTitle=${annonceId}&firstParticipant=${auteurId}&secondParticipant=${expediteurId}`)
        .then(res => this.didUserAnswerToThis = res.data.length > 0).catch(err => console.log(err));

    // requete pour verifier si l'on est sur ses annonces ou sur les annonces normaux;
    axios.get(routeList.annonces + '/' + annonceId).then(res => {
      this.annonce = res.data;
      this.isMyOwn = this.$route.name === 'mon-annonce' || this.annonce.userId === this.user.id;
    })
  },
  methods: {
    updateEdit() {
      this.editMode = !this.editMode;
      axios.get(routeList.categories)
          .then(res => {
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
    },
    prompt() {
      this.$buefy.dialog.prompt({
        message: `Allez-y faites le premier pas 😁`,
        inputAttrs: {
          placeholder: "Ex: Bonjour votre service m'interesse.",
          maxlength: 140
        },
        trapFocus: true,
        onConfirm: (message) => {
          const auteurId = this.annonce.userId;
          const expediteurId = this.user.id;

          delete this.rooms.id;
          this.rooms.annonceTitle = this.annonce.id;
          this.rooms.firstParticipant = auteurId;
          this.rooms.secondParticipant = expediteurId;
          this.rooms.messages.push({text: message, sender: expediteurId});

          axios.post(routeList.rooms, this.rooms).then(() => {
            this.didUserAnswerToThis = !this.didUserAnswerToThis;
            this.$buefy.toast.open({
              duration: 3000,
              message: "Notre cyber-coursier s'occuper de votre message resté au chaud 💫",
              type: 'is-success'
            });
          }).catch(err => console.log(err))
        }
      })
    },
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
