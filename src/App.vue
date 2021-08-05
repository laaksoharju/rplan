<template>
<v-app>
  <div id="app">
    <navigation></navigation>
    <router-view/>
  </div>
</v-app>
</template>
<script>

import navigation from './components/Nav'
import {mapMutations} from 'vuex'

export default {
  name: 'app',
  components: {
    'navigation': navigation
  },
  methods: {
    ...mapMutations(['login'])
  },
  created() {
    this.login('Läk J')
  }
}
</script>
<style>
body {
	margin:0;
	font-family: Roboto,sans-serif;
}

input {
	font-family: inherit;
  font-size: 1rem;
}
</style>
