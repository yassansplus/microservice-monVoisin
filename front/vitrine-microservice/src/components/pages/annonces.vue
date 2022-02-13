<template>
  <div>
    <b-field>
      <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
    </b-field>
    <banner v-if="showSearch" v-bind:show-search-bar="true"></banner>
    <div class="container">
      <div v-for="(annonce, index) in annonces" :key="index">
        <router-link :to="'/'+basePath+'/'+annonce.id">
          <card :annonce="annonce"></card>
        </router-link>
      </div>
    </div>
  </div>

</template>
<script>
import banner from '../element/banner'
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
      basePath: 'annonce',
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
  components: {
    banner,
    card
  }
}
</script>
