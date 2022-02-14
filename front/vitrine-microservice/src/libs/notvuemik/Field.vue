<template>
  <component
    :is="component"
    :name="name"
    @input="notvuemik.change"
    :value="notvuemik.values[name]"
    :checked="notvuemik.values[name]"
    >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "Field",
  props: {
    component: { type: [Object, String], required: true },
    name: { type: String, required: true }
  },
  inject: ["notvuemik"],
  methods: {},
};
</script>

<style scoped>

</style>