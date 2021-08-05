<template>
  <div>
    <v-card>
      <v-card-title>
        Sjuksköterskor
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
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.namn">
              <td>
                <span>
                  <v-avatar size="36px">
                    <img alt="Avatar" :src="'/img/avatar/' + item.img">
                  </v-avatar>
                  <strong>{{ item.namn.replace(" ","&nbsp;") }}</strong>
                </span>
              </td>
              <td v-for="n in 31" :key="item.namn+n">
                <v-chip :color="getColor(item['dag'+n])" dark>{{ item['dag'+n] }}</v-chip>
              </td>
              <td>
                <strong>{{ item.total }} h</strong>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
    <v-card>
      <v-card-title>
        Läkare
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
        :headers="days"
        :items="physicians"
        :search="search"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td>
                {{ item.name}}
              </td>
              <td v-for="(day,index) in days.slice(1)" :key="item.name+index">
                <SmallTimeline :start="parseInt(item[day.value+'Line1'])" :end="parseInt(item[day.value+'Line2'])" :startText="item[day.value+'1']" :endText="item[day.value+'2']"/>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import SmallTimeline from "@/components/SmallTimeline";
  /*
    TODO: datum, veckor och markerade helgdagar istf dagX
          välja tidsspann och ändra önskemål, ändra önskemål per dag osv

  */ 
  export default {
    name:"Planning",
    components: {
      SmallTimeline
    },
    data () {
      return {
        personer: [],
        physicians: [],
        days: [
          {
            text: '',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Måndag', sortable: true, value: 'monday' },
          { text: 'Tisdag', sortable: true, value: 'tuesday' },
          { text: 'Onsdag', sortable: true, value: 'wednesday' },
          { text: 'Torsdag', sortable: true, value: 'thursday' },
          { text: 'Fredag', sortable: true,  value: 'friday' }
          ],
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
            this.physicians = initData.physicians;
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
<style scoped>
  .v-data-table>.v-data-table__wrapper>table>tbody>tr>td, .v-data-table>.v-data-table__wrapper>table>thead>tr>th  
  { padding: 0; }

</style>