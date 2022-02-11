<template>

  <div class="div isOwner">
    <div class="columns">
      <div class="column is-offset-1 is-4">
        <div class="card" @click="emitEditMode" v-if="!updateEdit">
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
                <div class="column">
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
import axios from "axios";
import routeList from '../../entity/routeList';

export default {
  props: ['annonceId', 'isEditing'],
  data: function () {
    return {
      editMode: this.isEditing
    }
  },
  computed: {
    updateEdit() {
      return this.isEditing
    }
  },
  methods: {
    deleteAnnonce() {
      this.$buefy.dialog.confirm({
        message: 'Souhaitez-vous vraiment supprimer cette annonce??',
        cancelText: 'Annuler',
        confirmText: 'Supprimer',
        type: 'is-danger',
        onConfirm: () => {
          axios.delete(routeList.annonces + "/" + this.annonceId).then(res => {
            if (res.status === 204) {
              this.$buefy.toast.open({
                duration: 3000,
                message: `👋 l'annonce a bien été supprimé!`,
                type: 'is-success'
              });
              this.$router.push('/mes-annonces');
            }
          });
        }
      })
    },
    emitEditMode() {
      this.$emit('editMode')
    }
  }
}
</script>
