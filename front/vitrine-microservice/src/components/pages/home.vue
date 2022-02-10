<template>
  <div>
    <b-field>
      <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
    </b-field>
    <banner v-if="showSearch" v-bind:show-search-bar="true"></banner>
    <div class="container">
      <div v-for="(annonce, index) in annonces" :key="index">
        <card :annonce="annonce"></card>
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
      showSearch : true
    }
  },
  beforeMount() {
    const userId = JSON.parse(this.$cookie.get('user')).id;
    const url = this.$route.name === 'mes-annonces' ? routeList.home + "/" + userId : routeList.home;
    this.showSearch = this.$route.name === 'home';
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
