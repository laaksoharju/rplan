<template>
  <div>
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
    name:"EmployeePage",
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