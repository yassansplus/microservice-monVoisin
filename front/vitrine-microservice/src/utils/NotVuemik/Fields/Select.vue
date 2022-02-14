<template>
  <select>
    <option v-for="(option, index) in options" :value="option.value" :key="index">
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: "Select",
  props: {
    options: { type: Array, required: true }
  }
}
</script>

<style scoped>

</style>