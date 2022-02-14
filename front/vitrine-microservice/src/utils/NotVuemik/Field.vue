<template>
  <div>
    <component
      :is="component"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      >
      <slot></slot>
    </component>
  </div>
</template>

<script>
import Vue from 'vue';
Vue.component('notvuemik-text', () => import('Fields/Text'))
Vue.component('notvuemik-textarea', () => import('Fields/TextArea'))
Vue.component('notvuemik-select', () => import('Fields/Select'))

export default {
  name: "Field",
  props: {
    component: { type: String, required: true },
    name: { type: String, required: true },
    placeholder: { type: String, required: false}
  },
  data: () => ({
    value: null
  }),
  inject: ["notvuemik"],
  created() {
    this.setInitialValue()
  },
  methods: {
    setInitialValue() {
      if (this.notvuemik.value[this.name] !== undefined) {
        this.Value = this.notvuemik.value[this.name]
      }
    }
  }
}
</script>

<style scoped>

</style>