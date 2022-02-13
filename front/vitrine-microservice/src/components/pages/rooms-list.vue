<template>
  <div>

    <div v-for="room in roomsList" :key="room.id">
      <router-link :to="{name: 'chat',params: {room}}">
        <card-rooms :room="room"></card-rooms>
      </router-link>
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

    }
  },
  beforeMount() {
    const user = JSON.parse(this.$cookie.get('user'));
    axios.get(`${routeList.myRooms}?secondParticipant=${user.id}`).then(res => this.roomsList = res.data);
  },
  name: 'rooms',
  components: {
    cardRooms,
  }
}
</script>
