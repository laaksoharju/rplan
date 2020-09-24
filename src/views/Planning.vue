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
    <v-data-table dense
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
            <strong>{{ item.namn.replace(" ","&nbsp;") }}</strong>
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
        <template v-slot:item.dag6="{ item }">
            <v-chip :color="getColor(item.dag6)" dark>{{ item.dag6 }}</v-chip>
        </template>
        <template v-slot:item.dag7="{ item }">
            <v-chip :color="getColor(item.dag7)" dark>{{ item.dag7 }}</v-chip>
        </template>
        <template v-slot:item.dag8="{ item }">
            <v-chip :color="getColor(item.dag8)" dark>{{ item.dag8 }}</v-chip>
        </template>
        <template v-slot:item.dag9="{ item }">
            <v-chip :color="getColor(item.dag9)" dark>{{ item.dag9 }}</v-chip>
        </template>
        <template v-slot:item.dag10="{ item }">
            <v-chip :color="getColor(item.dag10)" dark>{{ item.dag10 }}</v-chip>
        </template>
        <template v-slot:item.dag11="{ item }">
            <v-chip :color="getColor(item.dag11)" dark>{{ item.dag11 }}</v-chip>
        </template>
        <template v-slot:item.dag12="{ item }">
            <v-chip :color="getColor(item.dag12)" dark>{{ item.dag12 }}</v-chip>
        </template>
        <template v-slot:item.dag13="{ item }">
            <v-chip :color="getColor(item.dag13)" dark>{{ item.dag13 }}</v-chip>
        </template>
        <template v-slot:item.dag14="{ item }">
            <v-chip :color="getColor(item.dag14)" dark>{{ item.dag14 }}</v-chip>
        </template>
        <template v-slot:item.dag15="{ item }">
            <v-chip :color="getColor(item.dag15)" dark>{{ item.dag15 }}</v-chip>
        </template>
        <template v-slot:item.dag16="{ item }">
            <v-chip :color="getColor(item.dag16)" dark>{{ item.dag16 }}</v-chip>
        </template>
        <template v-slot:item.dag17="{ item }">
            <v-chip :color="getColor(item.dag17)" dark>{{ item.dag17 }}</v-chip>
        </template>
        <template v-slot:item.dag18="{ item }">
            <v-chip :color="getColor(item.dag18)" dark>{{ item.dag18 }}</v-chip>
        </template>
        <template v-slot:item.dag19="{ item }">
            <v-chip :color="getColor(item.dag19)" dark>{{ item.dag19 }}</v-chip>
        </template>
        <template v-slot:item.dag20="{ item }">
            <v-chip :color="getColor(item.dag20)" dark>{{ item.dag20 }}</v-chip>
        </template>
        <template v-slot:item.dag21="{ item }">
            <v-chip :color="getColor(item.dag21)" dark>{{ item.dag21 }}</v-chip>
        </template>
        <template v-slot:item.dag22="{ item }">
            <v-chip :color="getColor(item.dag22)" dark>{{ item.dag22 }}</v-chip>
        </template>
        <template v-slot:item.dag23="{ item }">
            <v-chip :color="getColor(item.dag23)" dark>{{ item.dag23 }}</v-chip>
        </template>
        <template v-slot:item.dag24="{ item }">
            <v-chip :color="getColor(item.dag24)" dark>{{ item.dag24 }}</v-chip>
        </template>
        <template v-slot:item.dag25="{ item }">
            <v-chip :color="getColor(item.dag25)" dark>{{ item.dag25 }}</v-chip>
        </template>
        <template v-slot:item.dag26="{ item }">
            <v-chip :color="getColor(item.dag26)" dark>{{ item.dag26 }}</v-chip>
        </template>
        <template v-slot:item.dag27="{ item }">
            <v-chip :color="getColor(item.dag27)" dark>{{ item.dag27 }}</v-chip>
        </template>
        <template v-slot:item.dag28="{ item }">
            <v-chip :color="getColor(item.dag28)" dark>{{ item.dag28 }}</v-chip>
        </template>
        <template v-slot:item.dag29="{ item }">
            <v-chip :color="getColor(item.dag29)" dark>{{ item.dag29 }}</v-chip>
        </template>
        <template v-slot:item.dag30="{ item }">
            <v-chip :color="getColor(item.dag30)" dark>{{ item.dag30 }}</v-chip>
        </template>
        <template v-slot:item.dag31="{ item }">
            <v-chip :color="getColor(item.dag31)" dark>{{ item.dag31 }}</v-chip>
        </template>
        <template v-slot:item.total="{ item }">
            <span>
            <strong>{{ item.total }} h</strong>
            </span>
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
            text: '',
            align: 'start',
            sortable: true,
            value: 'namn',
          },
          { text: 'Dag 1', value: 'dag1' },
          { text: 'Dag 2', value: 'dag2' },
          { text: 'Dag 3', value: 'dag3' },
          { text: 'Dag 4', value: 'dag4' },
          { text: 'Dag 5', value: 'dag5' },
          { text: 'Dag 6', value: 'dag6' },
          { text: 'Dag 7', value: 'dag7' },
          { text: 'Dag 8', value: 'dag8' },
          { text: 'Dag 9', value: 'dag9' },
          { text: 'Dag 10', value: 'dag10' },
          { text: 'Dag 11', value: 'dag11' },
          { text: 'Dag 12', value: 'dag12' },
          { text: 'Dag 13', value: 'dag13' },
          { text: 'Dag 14', value: 'dag14' },
          { text: 'Dag 15', value: 'dag15' },
          { text: 'Dag 16', value: 'dag16' },
          { text: 'Dag 17', value: 'dag17' },
          { text: 'Dag 18', value: 'dag18' },
          { text: 'Dag 19', value: 'dag19' },
          { text: 'Dag 20', value: 'dag20' },
          { text: 'Dag 21', value: 'dag21' },
          { text: 'Dag 22', value: 'dag22' },
          { text: 'Dag 23', value: 'dag23' },
          { text: 'Dag 24', value: 'dag24' },
          { text: 'Dag 25', value: 'dag25' },
          { text: 'Dag 26', value: 'dag26' },
          { text: 'Dag 27', value: 'dag27' },
          { text: 'Dag 28', value: 'dag28' },
          { text: 'Dag 29', value: 'dag29' },
          { text: 'Dag 30', value: 'dag30' },
          { text: 'Dag 31', value: 'dag31' },
          {
            text: 'Total',
            align: 'end',
            sortable: false,
            value: 'total',
          },
        ],
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
          if (v){
          if (v.charAt(0) == 'N') return 'red'
          else if (v.charAt(0) == 'C') return 'orange'
          else if (v.charAt(0) == 'A') return 'green'
          else return 'grey'
          }
          else return 'transparent'
        },
    },
  }
</script>
<style>
  .v-data-table>.v-data-table__wrapper>table>tbody>tr>td, .v-data-table>.v-data-table__wrapper>table>thead>tr>th  { padding: 0; }
</style>