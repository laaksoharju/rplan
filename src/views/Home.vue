<template>
  <div>
    <div class="change-value-modal" v-show="changeValueEnabled" @click.self="cancelChangeValues">
      <div class="modal-box">
        <button class="close" @click="cancelChangeValues"> 
          ✕
        </button> 
        <p>Add new values for selected days.</p>
        <label>
          <input type="checkbox" v-model="setNewValueStaff"> Staff
        </label>
        <input type="number" v-model="newValueStaff"> %
        <label>
          <input type="checkbox" v-model="setNewValueRooms"> Rooms
        </label>
          <input type="number" v-model="newValueRooms"> %
        <button class="change-button" @click="changeSelectedValues"> 
          Change selected
        </button> 
      </div>
    </div>
    <div class="overview">
      <div class="year care">
        <div :class="['week', {highlighted: isHighlighted(week)}]" type="text" v-for="week in 52" :key="'n' + week">
          {{ week }}
        </div>
      </div>
      <div class="care capacity" v-for="(item, index) in prognosisStaff" :key="'s' + index">
        <div class="diagnosis">
          {{item.diagnosis}}
        </div>
        <input class="guesswork" type="text" v-model="item.no_visits">
  <!--       <input class="plan" type="text" v-for="week in 52" :key="week" v-model="item['w_' + week]" :title="prognosisPatCalc[index]['w_' + week]"> -->
        <div v-for="week in 52" :class="['plan-wrapper', {highlighted: isHighlighted(week)}, {selected: isSelected(week, index)}]" :key="week"
        @mousedown="setStartCoords(week, index)" @mouseup="setEndCoords()" @mouseover="setSelected(week, index)">
          <div class="plan staff" :style="{height:(item['w_' + week]*100)+'%'}" :title="prognosisPatCalc[index]['w_' + week]">
            .
          </div>
          <div class="plan room" :style="{height:(prognosisRooms[index]['w_' + week]*100)+'%'}">
            .
          </div>
        </div>
        <div @mouseover="setEndCoords()" class="prev-year">
          <!--@mouseover here is a stupid hack. fix!-->
          {{prognosisPatCalc[index].plan_min}}
        </div>
        <!--@mouseover here is a stupid hack. fix!-->
        <input @mouseover="setEndCoords()" :class="['sum-diagnosis', {'ok': prognosisPatCalc[index].sum > prognosisPatCalc[index].plan_min }, {'warning':prognosisPatCalc[index].sum <= prognosisPatCalc[index].plan_min}]" type="text" :value="Math.round(prognosisPatCalc[index].sum)">
      </div>
    </div>
    <div @mouseover="setEndCoords()">
      <!--stupid hack. fix!-->
      &nbsp;
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
      prognosisRooms: [],
      startCoords: {x: null, y: null},
      endCoords: {x: 1, y: 1},
      changeValueEnabled: false,
      newValueStaff: 100,
      newValueRooms: 100,
      setNewValueStaff: false,
      setNewValueRooms: false,
      highlightedWeek: 0
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
        return d}.bind(this))
    }
  },
  created: function () {
    this.$store.state.socket.emit('pageLoaded');
    this.$store.state.socket.on('initialize', function (data) {
      this.prognosisPat = data.prognosisPat;
      this.prognosisStaff = data.prognosisStaff;
      this.prognosisRooms = data.prognosisRooms;
    }.bind(this));
  },
  methods: {
    isHighlighted: function (x) {
      return x === this.highlightedWeek;
    },
    setStartCoords: function (x, y) {
      this.startCoords = {x: x, y: y};
      this.endCoords = {x: x, y: y};
      this.selecting = true;
    },
    setSelected: function (x, y) {
      if (this.selecting) {
        this.endCoords = {x: x, y: y};
      }
      this.highlightedWeek = x;
    },
    setEndCoords: function () {
      if (this.selecting) {
        this.selecting = false;
        this.changeValueEnabled = true;
      }
    },
    isSelected: function (x, y) {
      if (this.startCoords.x === null)
        return false;
      let coordsMin = {x: Math.min(this.startCoords.x, this.endCoords.x), y: Math.min(this.startCoords.y, this.endCoords.y)}
      let coordsMax = {x: Math.max(this.startCoords.x, this.endCoords.x), y: Math.max(this.startCoords.y, this.endCoords.y)}
      if (x >= coordsMin.x && x <= coordsMax.x &&
          y >= coordsMin.y && y <= coordsMax.y)
        return true;
      return false;
    },
    changeSelectedValues: function () {
      let coordsMin = {x: Math.min(this.startCoords.x, this.endCoords.x), y: Math.min(this.startCoords.y, this.endCoords.y)}
      let coordsMax = {x: Math.max(this.startCoords.x, this.endCoords.x), y: Math.max(this.startCoords.y, this.endCoords.y)}
      for(let index = coordsMin.y; index <= coordsMax.y; index += 1)
        for(let week = coordsMin.x; week <= coordsMax.x; week += 1) {
          if (this.setNewValueStaff)
            this.prognosisStaff[index]['w_'+ week] = this.newValueStaff/100;
          if (this.setNewValueRooms)
            this.prognosisRooms[index]['w_'+ week] = this.newValueRooms/100;
        }
      this.startCoords.x = null;
      this.changeValueEnabled = false;

    },
    cancelChangeValues: function () {
      this.startCoords.x = null;
      this.changeValueEnabled = false;
    }
  }
}
</script>
<style scoped>
  .care {
    display: grid;
    grid-column-gap: 0;
    user-select: none;
  }
    .capacity {
    grid-template-columns: 14em 2.5em repeat(52, calc(1.5em)) 2.5em 2.5em;
  }
  .need {
    grid-template-columns: 14em 2.5em 2.5em repeat(auto-fit, calc(1.5em)) 
  }

  .plan-wrapper {
    display: flex;
    align-items: flex-end;
    padding: 0.2em;
    background-color: transparent;
    height:calc(100% - 0.4em);
    width:1em;
  }

  .plan {
    margin-left: 0.2em;
    width:100%;
    color:transparent;
  }
  .staff {
    background-color: steelblue;
  }
  .room {
    background-color: maroon;
  }
  .selected {
    background-color: rgba(255,255,0,0.5);
  }

  input[type='text'] {
    padding-right: 0.4em;
    text-align: right;
    border:0;
    border-bottom: 1px solid black;
  }
  .sum-diagnosis {
  
  }
  .diagnosis {
    padding:0.2em;
  }
  .guesswork {
    background-color: peachpuff;
  }

  .ok {
    background-color: rgba(0,255,0,0.5);
  }

  .warning {
    background-color: crimson;
    color:white;
  }
  .prev-year {
    text-align: right;
    padding: 0.1em;
    padding-right:0.4em;
  }
  .week {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.1em;
  }
  .year {
    display: grid;
    grid-template-columns: repeat(52, calc(1.5em));
    margin-left:16.5em;

  }
  .diagnosis {
    user-select: none;
  }

  .overview {
    margin:1em;
  }

  .care:hover, .highlighted {
    background-color: rgba(255,0,0,0.1);
  }

  .change-value-modal {
    position: absolute;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height:100%;
  }
  .modal-box {
    position: relative;
    width:20em;
    background-color: white;
    box-shadow: 0 1em 2em rgba(0,0,0,0.5);
    padding:2em;
  }
  .modal-box input[type=number] {
    -moz-appearance:textfield; /* Firefox */
  }

  .modal-box input[type=number]::-webkit-inner-spin-button, 
  .modal-box input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
  .modal-box input[type=number] {
    width:2em;
    font-size: 2em;
    text-align: right;
    border:0;
    border-bottom: 1px solid;
  }
  .change-button {
    margin-left: 1em;
    margin-top: 1em;
    font-family: inherit;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 0;
    box-shadow: 0 0 1rem rgba(0,0,0,0.2);
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    text-shadow: 0 0 1rem rgba(0,0,0,0.5);
    background: linear-gradient(lightgreen,green);
  }

  .close {
    background-color: transparent;
    font-size: 1.5em;
    border:0;
    padding: 0.5em;
    border-radius: 0.7em;
    height: 1em;
    width: 1em;
    line-height: 1.3em;
    position: absolute;
    right: 1em;
    top:0;
    cursor: pointer;
  }
  .close:hover {
    color:red;
  }

</style>
