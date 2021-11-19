<template>
  <div>

    <div class="banner has-background-primary-light">
      <h1 class="banner-title">
        Rechercher un service avec Mon voisin
      </h1>
    </div>
    <div class="container" v-show="showSearchBar">
      <searchbar></searchbar>
    </div>
  </div>
</template>

<script>
import searchbar from "./searchbar";

export default {
  props: {
    showSearchBar: Boolean
  },
  components: {
    searchbar
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
</style>
