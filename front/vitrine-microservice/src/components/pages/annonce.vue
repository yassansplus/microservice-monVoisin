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
      <owner-annonce-cta v-if="isMyOwn"></owner-annonce-cta>
      <annonce-cta v-else></annonce-cta>

    </section>
    <section class="body">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <h1> Ma super annonce</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4 is-offset-1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, deleniti dignissimos distinctio eligendi
            ex iure neque pariatur perspiciatis possimus quae quo reiciendis repudiandae saepe sed soluta, voluptate
            voluptates? At, porro.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab amet aut consequatur dolores dolorum eos eum
            explicabo fugit ipsa, magnam minima natus officia quam quasi saepe sint voluptate voluptates!
          </p>
        </div>
      </div>
    </section>
  </div>

</template>
<script>
import ownerAnnonceCta from '../element/owner-annonce-cta'
import annonceCta from '../element/annonce-cta'

export default {
  data: function () {
    return {
      isMyOwn: false
    }
  },
  beforeMount() {
    this.isMyOwn = this.$route.name === 'mon-annonce';
  },
  methods: {
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`
    },
    deleteAnnonce() {
      return 'annonce supprimé'
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
