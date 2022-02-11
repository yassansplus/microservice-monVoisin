<template>

  <div class="div isOwner">
    <div class="columns">
      <div class="column is-offset-1 is-4">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column is-3 ">
                  <b-icon
                      pack="fas"
                      :icon="'user'"
                      size="is-medium"
                  >
                  </b-icon>
                </div>
                <div class="column ">
                  <h4>
                    Modifier l'annonce
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-offset-1 is-4">
        <div class="card" @click="deleteAnnonce()">
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column is-3 ">
                  <b-icon
                      pack="fas"
                      :icon="'trash-alt'"
                      size="is-medium"
                  >
                  </b-icon>
                </div>
                <div class="column ">
                  <h4>
                    Supprimer l'annonce
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    deleteAnnonce() {
      return 'annonce supprimé'
    }
  }
}
</script>
