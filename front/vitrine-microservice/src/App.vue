<template>
  <div>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from "./components/element/navbar"

export default {
  name: 'App',
  components: {
    navbar

  }
}
</script>
