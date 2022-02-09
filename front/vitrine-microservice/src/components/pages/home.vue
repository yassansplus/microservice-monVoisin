<template>
  <div>
    <banner v-bind:show-search-bar="true"></banner>
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
      annonces: []
    }
  },
  beforeMount() {
    axios.get(routeList.home).then(res => this.annonces = res.data)
  },
  components: {
    banner,
    card
  }
}
</script>
