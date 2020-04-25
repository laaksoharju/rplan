<template>
  <div>
    <div>
      <p>Welcome to Admin.</p>
      <ul>
        <li v-for="data in PrognosisRooms" v-bind:key="data.id">{{data.diagnosis}}</li>
    </ul>
    </div>
   </div>
</template> 

<script>
export default {
  name:"Admin",
  data: function () {
    return {
      PrognosisRooms: [],
    }
  },
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  },
  created: function () {
    this.$store.state.socket.emit('pageLoaded');
    /*this.$store.state.socket.on('initialize', function (db) {
      this.PrognosisRooms = db.getPrognosisRooms();
    }.bind(this));*/
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
<style scoped></style>