<template>
  <div>
    <div class="selection"></div>
    {{startCoords}} {{endCoords}}
    <div class="year care">
      <div class="week" type="text" v-for="week in 52" :key="'n' + week">
        {{ week }}
      </div>
    </div>
    <div class="care capacity" v-for="(item, index) in prognosisStaff" :key="'s' + index">
      <div class="diagnosis">
        {{item.diagnosis}}
      </div>
      <input class="guesswork" type="text" v-model="item.no_visits">
<!--       <input class="plan" type="text" v-for="week in 52" :key="week" v-model="item['w_' + week]" :title="prognosisPatCalc[index]['w_' + week]"> -->
      <div :class="['plan-wrapper', {selected: false && isSelected[week][index]}]" v-for="week in 52" :key="week"
      @mousedown="setStartCoords(week, index)" @mouseup="setEndCoords()" @mouseover="setSelected(week, index)">
        <div class="plan" :style="{height:(item['w_' + week]*100)+'%'}" :title="prognosisPatCalc[index]['w_' + week]">
        </div>
      </div>
      <div class="prev-year">{{prognosisPatCalc[index].plan_min}}</div>
      <input :class="[{'ok': prognosisPatCalc[index].sum > prognosisPatCalc[index].plan_min }, {'warning':prognosisPatCalc[index].sum <= prognosisPatCalc[index].plan_min}]" type="text" v-model="prognosisPatCalc[index].sum">
    </div>
<!--     <p>&nbsp;</p>
    <div class="care need" v-for="(item, index) in prognosisPatCalc" :key="'p' + index">
      <div>
        {{item.diagnosis}}
      </div>
      <input type="text" v-model="item.plan_min">
      <input type="text" v-model="item.sum">
<!- -       <input type="text" v-model="item.plan_max"> - ->
      <input type="text" v-for="week in 52" :key="week" v-model="item['w_' + week]">
      <!- - <input type="text" v-for="week in 52" :key="week" v-model="item['w_' + week]"> - ->
    </div> 
<div v-selectable="{ 
         selectedGetter: selectedGetter, 
         selectedSetter: selectedSetter, 
         selectingSetter: selectingSetter
         }" id="app">
        <div class="selection"></div>
        <div v-for="(i, item) in items"
             :class="{ selected: !!selected[i], selecting: !!selecting[i] }"
           class="selectable" >{{ item }}</div>
</div>

  -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: function () {
    return {
      prognosisPat: [],
      prognosisStaff: [],
      isSelected: new Array(52).fill(new Array(31)).fill(null),
      startCoords: {x: null, y: null},
      endCoords: {x: null, y: null},
    }
  },
  computed: {
    prognosisPatCalc: function () {
      return this.prognosisPat.map(function(d, j) {
        d.sum = 0;
        for (let i = 1; i<53; i ++) {
          d["w_" + i] = this.prognosisStaff[j]["w_" + i] * this.prognosisStaff[j].no_visits
          d.sum += d["w_" + i]
        }
        return d }.bind(this))
    }
  },
  created: function () {
    this.$store.state.socket.emit('pageLoaded');
    this.$store.state.socket.on('initialize', function (data) {
      this.prognosisPat = data.prognosisPat;
      this.prognosisStaff = data.prognosisStaff;
    }.bind(this));
  },
  methods: {
    setStartCoords: function (x, y) {
      this.startCoords = {x: x, y: y}
      this.selecting = true;
    },
    setEndCoords: function () {
      this.selecting = false;
    },
    setSelected: function (x, y) {
      if (!this.selecting) {
        return false;
      }
      this.endCoords = {x: x, y: y};
      let coordsMin = {x: Math.min(this.startCoords.x, this.endCoords.x), y: Math.min(this.startCoords.y, this.endCoords.y)}
      let coordsMax = {x: Math.max(this.startCoords.x, this.endCoords.x), y: Math.max(this.startCoords.y, this.endCoords.y)}
      if (x >= coordsMin.x && x <= coordsMax.x &&
          y >= coordsMin.y && y <= coordsMax.y)
        return true;
      return false;
    }
  }
}
</script>
<style scoped>
  .care {
    display: grid;
    grid-column-gap: 1px;
    margin-bottom: 0.5em;
    user-select: none;
  }
    .capacity {
    grid-template-columns: 14em 2.5em repeat(52, calc(1.5em)) 2.5em 2.5em;
  }
  .need {
    grid-template-columns: 14em 2.5em 2.5em repeat(auto-fit, calc(1.5em)) 
  }
  .plan-wrapper {
    /*display: flex;*/
    background-color: white;
    height:1em;
    padding:0.2em;
    align-items: end;
  }
  .selected {
    background-color: yellow;
  }
  .plan {
    background-color: steelblue;
  }

  input[type='text'] {
    padding-right: 0.4em;
    text-align: right;
  }
  .guesswork {
    background-color: peachpuff;
  }

  .ok {
    background-color: lime;
  }

  .warning {
    background-color: crimson;
    color:white;
  }
  .prev-year {
    text-align: right;
    padding: 0.1em;
    padding-right:0.4em;
    font-family: sans-serif;
    font-size: 9pt;
  }
  .week {
    display: inline-block;
  }
  .year {
    display: grid;
    grid-template-columns: repeat(52, calc(1.5em));
    margin-left:17em;

  }
  .diagnosis {
    user-select: none;
  }

</style>
