<template>
  <div>
    <div class="columns">
      <div class="column is-6">
        Mes demandes
        <div v-for="room in roomsList" :key="room.id">
          <router-link :to="{name: 'chat',params: {room}}">
            <card-rooms :room="room"></card-rooms>
          </router-link>
        </div>
      </div>
      <div class="column is-6">
        Demande recu
        <div v-for="room in demandeRecu" :key="room.id">
          <router-link :to="{name: 'chat',params: {room}}">
            <card-rooms :room="room"></card-rooms>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import cardRooms from '../element/card-rooms';
import axios from 'axios';
import routeList from '../../entity/routeList'

export default {
  data: function () {
    return {
      roomsList: [],
      demandeRecu: []

    }
  },
  beforeMount() {
    const user = JSON.parse(this.$cookie.get('user'));
    axios.get(`${routeList.myRooms}?secondParticipant=${user.id}`).then(res => this.roomsList = res.data);
    axios.get(`${routeList.myRooms}?firstParticipant=${user.id}`).then(res => this.demandeRecu = res.data);
  },
  name: 'rooms',
  components: {
    cardRooms,
  }
}
</script>
