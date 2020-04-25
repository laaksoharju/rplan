<template>
  <div>
    <div>
      <p>Welcome to Admin.</p>
    </div>
   </div>
</template> 

<script>
export default {
  name:"Admin",
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
<style scoped></style>