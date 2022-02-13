<template>
  <div>
    <b-field>
      <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
    </b-field>
    <div v-if="showSearch">
      <div>

        <div class="banner has-background-primary-light">
          <h1 class="banner-title">
            Rechercher un service avec Mon voisin
          </h1>
        </div>
        <div class="container">
          <section class="container">
            <div class="columns">
              <div class="block column is-offset-4 is-4 ">
                <b-field label="Rechercher un service" :label-position="labelPosition">
                  <b-input placeholder="Rechercher un service 🔍..."
                           type="search"
                           icon="magnify"
                           v-model="search"
                           rounded
                  >
                  </b-input>
                </b-field>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="container">
      <div v-for="(annonce, index) in filteredList" :key="index">
        <router-link :to="'/'+basePath+'/'+annonce.id">
          <card :annonce="annonce"></card>
        </router-link>
      </div>
    </div>
  </div>

</template>
<script>
import card from '../element/card'
import axios from "axios";
import routeList from '../../entity/routeList'

export default {
  data: function () {
    return {
      annonces: [],
      lookingForMyAnnonce: false,
      isFullPage: true,
      isLoading: true,
      showSearch: true,
      labelPosition: 'on-border',
      basePath: 'annonce',
      search: ''
    }
  },
  beforeMount() {
    let url = '';
    let userId = "";
    if (this.$cookie.get('user') !== null) {
      userId = JSON.parse(this.$cookie.get('user')).id;
    }
    url = this.$route.name === 'mes-annonces' ? routeList.home + "/" + userId : routeList.home;

    this.showSearch = this.$route.name === 'home';
    this.basePath = this.$route.name === 'home' ? 'annonce' : 'mes-annonces';

    axios.get(url).then(res => {

      this.annonces = res.data;
      this.isLoading = false;
    })

  },
  computed: {
    filteredList() {
      return this.annonces.filter(annonce => {
        return annonce.titre.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  components: {
    card
  }
}
</script>
<style>
.banner {
  height: 300px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.control, .select, select {
  width: 100%;
}
</style>
