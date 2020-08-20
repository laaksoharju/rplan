<template>
<nav>
<v-toolbar dark dense src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-menu top :close-on-click="closeOnClick">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, index) in links"
            :key="index"
            @click="item.route"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
     <v-toolbar-title>rPlan</v-toolbar-title>

      <v-spacer></v-spacer>

      
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
</nav>
</template>
<script>
export default {
  data: () => ({
    drawer: false, 
    closeOnClick: false,
    links: [
      { icon: 'home', title: 'Home', route: '/'},
      { icon: 'contacts', title: 'Schedule', route: '/Schedule'},
      { icon: 'contacts', title: 'Admin', route: '/Admin'}, 
    ],
  }),
}
</script>