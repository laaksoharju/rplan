<template>
  <v-card>
    <v-card-title>
      Personplannering
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="personer"
      :search="search"
    >
        <template v-slot:item.namn="{ item }">
            <span><v-avatar size="36px">
                <img
                    alt="Avatar"
                    :src="'/img/avatar/' + item.img"
                >
            </v-avatar>
            <strong>{{ item.namn }}</strong>
            </span>
        </template>
        <template v-slot:item.dag1="{ item }">
            <v-chip :color="getColor(item.dag1)" dark>{{ item.dag1 }}</v-chip>
        </template>
        <template v-slot:item.dag2="{ item }">
            <v-chip :color="getColor(item.dag2)" dark>{{ item.dag2 }}</v-chip>
        </template>
        <template v-slot:item.dag3="{ item }">
            <v-chip :color="getColor(item.dag3)" dark>{{ item.dag3 }}</v-chip>
        </template>
        <template v-slot:item.dag4="{ item }">
            <v-chip :color="getColor(item.dag4)" dark>{{ item.dag4 }}</v-chip>
        </template>
        <template v-slot:item.dag5="{ item }">
            <v-chip :color="getColor(item.dag5)" dark>{{ item.dag5 }}</v-chip>
        </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    name:"Planning",
    data () {
      return {
        personer: [],
        search: '',
        headers: [
          {
            text: 'Person',
            align: 'start',
            sortable: false,
            value: 'namn',
          },
          { text: 'Dag 1', value: 'dag1' },
          { text: 'Dag 2', value: 'dag2' },
          { text: 'Dag 3', value: 'dag3' },
          { text: 'Dag 4', value: 'dag4' },
          { text: 'Dag 5', value: 'dag5' },
        ],
       /* personer: [
          {
            namn: 'Karin Persson',
            img: 'ALFKI.jpg', 
            dag1: 'A',
            dag2: 'N',
            dag3: 'A',
            dag4: 'A',
            dag5: 'C',
          },
          
        ],*/
      }
    },
    created: function () {
        console.log("Planning -> created ");
        this.$store.state.socket.emit('pageLoadedPlanning');
        this.$store.state.socket.on('initialize', function (initData) {
            console.log("Planning -> created -> initialize");
            this.personer = initData.personer;
        }.bind(this));
    },
    
    methods: {
        getColor (v) {
        if (v == 'N') return 'red'
        else if (v == 'C') return 'orange'
        else if (v == 'A') return 'green'
        else return 'grey'
        },
    },
  }
</script>