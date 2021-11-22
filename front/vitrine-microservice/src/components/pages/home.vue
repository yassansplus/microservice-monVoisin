<template>
  <div>
    <banner v-bind:show-search-bar="true"></banner>
    <div class="container">
      <div>
        <card v-for="(example, index) in posts" :key="index"></card>
      </div>
    </div>
  </div>

</template>
<script>
import banner from '../element/banner'
import card from '../element/card'

export default {
  data: function () {
    return {
      posts: [1, 2, 3]
    }
  },
  components: {
    banner,
    card
  }
}
</script>
