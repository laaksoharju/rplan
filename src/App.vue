<template>
  <div id="app">
    <navigation></navigation>
    <router-view/>
  </div>
</template>
<script>

import navigation from './components/Nav'
export default {
  name: 'app',
  components: {
    'navigation': navigation
  }
}
</script>
<style>
body {
	margin:0;
	font-family: 'Gill Sans';
}

input {
	font-family: inherit;
  font-size: 1rem;
}
</style>
