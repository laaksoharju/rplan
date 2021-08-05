<template>
<nav>
<v-toolbar dark dense src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-menu :close-on-click="closeOnClick" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
        </template>
  
        <v-list>
          <v-list-item
            v-for="item in links"
              :key="item.title"
              :to="item.route"
              link @click="$router.push({ path: item.route })"
              dense
              
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
    closeOnClick: true,
    links: [
      { icon: 'home', title: 'Home', route: '/'},
      { icon: 'contacts', title: 'Schedule', route: '/Schedule'},
      { icon: 'contacts', title: 'Planning', route: '/Planning'}, 
      { icon: 'contacts', title: 'Admin', route: '/Admin'},
      { icon: 'contacts', title: 'Employee', route: '/EmployeePage'}, 
    ],
  }),
}
</script>