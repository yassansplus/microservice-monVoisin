<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-6">
        <h1>Mes transactions</h1>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-6">
        <b-table
            :data="isEmpty ? [] : paiements"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :hoverable="isHoverable"
            :loading="isLoading"
            :focusable="isFocusable"
            :mobile-cards="hasMobileCards">

          <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
            {{ props.row.id }}
          </b-table-column>
          <b-table-column field="first_name" label="Type de transaction" v-slot="props">

            <span v-if="user.id === props.row.userPayer" class=" tag is-warning">
            <b-icon
                pack="fas"
                icon="arrow-right"
                size="is-medium">
            </b-icon>
            </span>
            <span v-else class=" tag is-success">
              <b-icon
                  pack="fas"
                  icon="arrow-left"
                  size="is-medium">
            </b-icon>
            </span>


          </b-table-column>
          <b-table-column field="first_name" label="Payeur" v-slot="props">

            <span v-if="user.id === props.row.userPayer">
              {{ user.nom }} {{ user.prenom }}
            </span>
            <span v-else>
              {{ props.row.room.author.nom }}
              {{ props.row.room.author.prenom }}
            </span>


          </b-table-column>


          <b-table-column field="date" label="Paye le" centered
                          v-slot="props">
                <span class="tag is-success">
                    {{ new Date(props.row.payeAt).toLocaleDateString() }}

                </span>
          </b-table-column>

          <b-table-column field="categorie" label="Categorie" centered v-slot="props">
            {{ props.row.room.annonce.categorie.label }}
          </b-table-column>
          <b-table-column field="categorie" label="Categorie" centered v-slot="props">
            {{ props.row.room.annonce.prix }} €
          </b-table-column>


          <b-table-column label="Titre" v-slot="props">
            {{ props.row.room.annonce.titre }}
          </b-table-column>

          <template #empty>
            <div class="has-text-centered">No records</div>
          </template>

        </b-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import routeList from '../../entity/routeList'


export default {
  name: 'transactions',
  async beforeMount() {
    this.user = JSON.parse(this.$cookie.get('user'));
    axios.get(routeList.paiement + "?userReceiverId=" + this.user.id).then(res => this.paiements = res.data);
    axios.get(routeList.paiement + "?userPayer=" + this.user.id).then(res => this.paiements.push(...res.data));
  },
  data() {
    return {
      user: '',
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
      paiements: [],
    }
  }
}
</script>

<style>
.card-inscription {
  margin-top: 10%;
}
</style>
