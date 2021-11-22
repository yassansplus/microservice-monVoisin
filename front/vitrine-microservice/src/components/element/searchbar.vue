<template>
  <section class="container">
    <div class="columns">
      <div class="block column is-offset-4 is-4 ">
        <b-field label="Rechercher un service" :label-position="labelPosition">
          <b-input placeholder="Rechercher un service 🔍..."
                   type="search"
                   icon="magnify"
                   rounded
          >
          </b-input>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column is-3 is-offset-1">
        <b-field label="Catégorie" :label-position="labelPosition">
          <b-select placeholder="Séléctionner une catégorie 🗄" rounded>
            <option value="flint">Flint</option>
            <option value="silver">Silver</option>
          </b-select>
        </b-field>
      </div>
      <div class="column is-4">
        <b-field label="Région" :label-position="labelPosition">
          <b-select placeholder="Select a character" rounded>
            <option value="flint">Flint</option>
            <option value="silver">Silver</option>
          </b-select>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="Département" :label-position="labelPosition">
          <b-select placeholder="Select a character" rounded>
            <option value="flint">Flint</option>
            <option value="silver">Silver</option>
          </b-select>
        </b-field>
      </div>
    </div>
  </section>


</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'on-border'
    }
  }
}
</script>
<style>
.control, .select, select {
  width: 100%;
}
</style>
