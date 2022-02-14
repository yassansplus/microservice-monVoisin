<template>
  <div class="notvuemik">
    <slot :handleSubmit="handleSubmit" :errors="{...computedErrors}"></slot>
  </div>
</template>

<script>
import { isInput, isSelect, isCheckbox, observerToJson } from "./helper";

export default {
  name: "NotVuemik",
  props: {
    onSubmit: { type: Function, required: true },
    initialValues: { type: Object, required: true },
    validationSchema: { type: Object, required: false },
  },
  data() {
    return { values: observerToJson(this.initialValues), errors: {} };
  },

  provide() {
    return {
      notvuemik: {
        value: this.values,
        change: this.handleChange,
        props: this.props,
      },
    };
  },
  computed: {
    computedErrors() {
      return this.$data.errors;
    },
  },
  methods: {
    eventOrValue(e) {
      if (!(e instanceof Event)) {
        throw new Error("Instance of Event expected");
      }

      const { target } = e;
      if (isSelect(target)) {
        const selectedOption = target.options[target.selectedIndex];
        return selectedOption.value;
      }

      if (isInput(target)) {
        return isCheckbox(target) ? target.checked: target.value;
      }

      return target.value;
    },
    handleChange(e) {
      this.setValues({ [e.target.name] : this.eventOrValue(e) });
    },
    setValues(values) {
      Object.entries(values).forEach(([key, val]) => {
        this.$data.values[key] = val;
      });
    },

    handleAddErrors(path, errors) {
      this.$data.errors = { [path]: errors };
    },

    handleResetErrors() {
      this.$data.errors = {};
    },

    handleSubmit() {
      if (this.validationSchema) {
        this.validationSchema
          .validate(this.values)
          .then((validatedObject) => {
            this.onSubmit(observerToJson(validatedObject));
            this.handleResetErrors();
          })
          .catch((err) => {
            this.handleAddErrors(err.path, err.errors);
          });
      } else this.onSubmit(observerToJson(this.values));
    },
  },
};
</script>

<style scoped>

</style>