<template>
  <div>
    <div class="columns">
      <div class="column is-offset-4">
        <h1>{{ roomChat.annonce.titre }}</h1>
        <h5>{{ roomChat.author.nom }} {{ roomChat.author.prenom }}</h5>
      </div>
    </div>
    <div class="columns">
      <div class="column is-3 is-offset-4" id="chat-wrapper">
        <div id="chat">
          <div id="messages-window">
            <span
                v-for="message in roomChat.messages"
                v-bind:class="'message ' + (message.sender === user.id  ? 'ours' : 'theirs')"
                :key="message.id">{{ message.text }}</span>
          </div>
          <input type="text" v-model="chat.text" v-on:keyup.enter="addMessage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import routeList from '../../entity/routeList'
import chatModel from '../../entity/chat';

export default {
  data: function () {
    return {
      roomsList: [],
      user: {},
      chat: chatModel,
      roomChat: {...this.room},
      reloadMessage: null

    }
  },
  beforeMount() {

    if (this.room === undefined) {
      this.$router.push('/mes-demandes');
    }
    this.user = JSON.parse(this.$cookie.get('user'));
  },
  mounted() {
    console.log(this.roomChat);
    // We execute this functino in mounted bc we need to load data bedore and mount the component
    this.scrollToBottom();
    // Ajouter l'ajax pour le chat
    this.reloadMessage = setInterval(() => {
      axios.get(routeList.myRooms + '?secondParticipant=' + this.room.secondParticipant).then(res => this.roomChat = res.data[0])
    }, 6000)
  },
  destroyed() {
    clearInterval(this.reloadMessage)
  },
  props: ['room'],
  name: 'chat',
  components: {},
  computed: {
    updateRoom() {
      return this.room
    }
  },
  methods: {
    addMessage() {
      this.chat.sender = this.user.id;
      this.roomChat.messages.push({...this.chat});
      axios.put(routeList.rooms + '/' + this.room.id, this.roomChat).then(res => {
        this.roomChat = res.data;
        this.chat.text = '';
        this.scrollToBottom()
      });
    },
    scrollToBottom() {
      const container = this.$el.querySelector("#chat");
      container.scrollTop = container.scrollHeight;
    }

  }
}
</script>
<style>


#chat {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  overflow-y: scroll;

}

#chat-wrapper {
  height: 500px;
  position: relative;
}

#messages-window {
  background: #eee;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;
  align-items: flex-start;
  padding: 20px;
}

.message {
  background: gray;
  color: white;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 16px;
  max-width: 70%;
}

.ours {
  background: #0076ff;
  align-self: flex-end;
}

input {
  padding: 10px;
  position: absolute;
  width: 95%;
  bottom: -30px;
}


</style>
