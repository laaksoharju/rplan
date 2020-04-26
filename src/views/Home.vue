<template>
  <div>
    <div class="change-value-modal" v-show="changeValueEnabled" @click.self="cancelChangeValues">
      <div class="modal-box">
        <button class="close" @click="cancelChangeValues"> 
          ✕
        </button> 
        <p>Add new values for selected days.</p>
        <div class="modal-section">
          <label>
            <input type="checkbox" v-model="setNewValueStaff"> Planned capacity
          </label>
          <input type="number" min="0" max="100" @input="setNewValueStaff = true" v-model="newValueStaff" @change="changeSelectedValues"> %
        </div>
<!--         <div class="modal-section">
          <label>
            <input type="checkbox" v-model="setNewValueRooms"> Rooms
          </label>
          <input type="number" min="0" max="100" @input="setNewValueRooms = true" v-model="newValueRooms"> %
        </div> -->
        <button class="change-button" @click="changeSelectedValues"> 
          Change selected
        </button> 
      </div>
    </div>
    <div class="overview">
      <strong>2020 w {{currentWeek}}</strong>
      <div class="year care">
        <div class="heading">
          Visit type
        </div>
        <div class="heading week">
          min
        </div>
        <div class="heading week">
          N
        </div>
        <div :class="['heading week', {past: (week < currentWeek)}, {highlighted: isHighlighted(week)}]" type="text" v-for="week in 52" :key="'n' + week" @mousedown="setStartColumn(week)" @mouseup="setEndCoords()" @mouseover="setSelectedColumn(week)">
          {{ week }}
        </div>
        <div class="week prev-year">
          2019
        </div>
      </div>
      <div class="care capacity" v-for="(item, index) in prognosisStaff" :key="'s' + index">
        <div class="diagnosis" @mousedown="setStartRow(index)" @mouseup="setEndCoords" @mouseover="setSelectedRow(index)">
          {{item.diagnosis}}
        </div>
        <input class="guesswork" type="text" v-model="prognosisPat[index].tid">
        <!-- <div class="diagnosis time">
          {{prognosisPat[index].tid}}
        </div> -->
        <input class="guesswork" type="text" v-model="item.no_visits">
  <!--       <input class="plan" type="text" v-for="week in 52" :key="week" v-model="item['w_' + week]" :title="prognosisPatCalc[index]['w_' + week]"> -->
        <div v-for="week in 52" :class="['plan-wrapper', {past: (week < currentWeek)}, {highlighted: isHighlighted(week)}, {selected: isSelected(week, index)}]" :key="week"
        @mousedown="setStartCoords(week, index)" @mouseup="setEndCoords()" @mouseover="setSelected(week, index)">
          <div v-if="showOutcome && week < currentWeek" class="plan outcome" :style="{height:(outcomeStaff[index]['w_' + week] / item.no_visits * 100 )+'%'}" :title="outcomeStaff[index]['w_' + week]">
            .
          </div>
          <div v-if="showStaff && week >= currentWeek" class="plan staff" :style="{height:(item['w_' + week]*100)+'%'}" :title="prognosisPatCalc[index]['w_' + week]">
            .
          </div>
<!--           <div v-if="showRooms" class="plan room" :style="{height:(prognosisRooms[index]['w_' + week]*100)+'%'}">
            .
          </div> -->
        </div>
        <div @mouseover="setEndCoords()" class="prev-year">
          <!--@mouseover here is a stupid hack. fix!-->
          {{prognosisPatCalc[index].plan_min}}
        </div>
        <!--@mouseover here is a stupid hack. fix!-->
  <!--       <div @mouseover="setEndCoords()" :class="['sum-diagnosis', {'ok': outcomePatCalc[index] > prognosisPatCalc[index].plan_min }, {'warning':outcomePatCalc[index] <= prognosisPatCalc[index].plan_min}]">
          {{ Math.round(outcomePatCalc[index]) }}
        </div> -->
        <div @mouseover="setEndCoords()" :class="['sum-diagnosis', {'ok': outcomePatCalc[index] > prognosisPatCalc[index].plan_min }, {'warning':outcomePatCalc[index] <= prognosisPatCalc[index].plan_min}]">
          {{ Math.round(outcomePatCalc[index] - prognosisPatCalc[index].plan_min) }}
        </div>
      </div>
    </div>
    <div @mouseover="setEndCoords()">
      <!--stupid hack. fix!-->
      <div class="filter-box">
        <span>
          Nominal planned hours/week: <strong>{{ sumTime }}</strong>
        </span>
        <label>
        <input type="checkbox" class="filter" v-model="showOutcome">
        <span class="filter-outcome"> ✔ </span> Outcome
        </label>
        <label>
        <input type="checkbox" class="filter" v-model="showStaff">
        <span class="filter-staff"> ✔ </span> Planned capacity
        </label>
<!--         <label>
        <input type="checkbox" class="filter" v-model="showRooms">
        <span class="filter-rooms"> ✔ </span> Rooms
        </label> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import {getWeekNumber} from '@/utils/week';

export default {
  name: 'Home',
  data: function () {
    return {
      prognosisPat: [],
      prognosisStaff: [],
      outcomeStaff: [],
      prognosisRooms: [],
      startCoords: {x: null, y: null},
      endCoords: {x: 1, y: 1},
      changeValueEnabled: false,
      newValueStaff: 100,
      newValueRooms: 100,
      setNewValueStaff: false,
      setNewValueRooms: false,
      highlightedWeek: 0,
      showOutcome: true,
      showStaff: true,
      showRooms: false,
      currentWeek: getWeekNumber(new Date())
    }
  },
  computed: {
    outcomePatCalc: function () {
      let arr = [];
      for (let j = 0; j < this.prognosisPat.length; j += 1) {
        let sum = 0;
        for (let i = 1; i<this.currentWeek; i ++) {
          sum += this.outcomeStaff[j]["w_" + i]
        }
        for (let i = this.currentWeek; i<=52; i ++) {
          sum += this.prognosisStaff[j]["w_" + i] * this.prognosisStaff[j].no_visits
        }
        arr[j] =sum;
      }
      return arr;
    },
    prognosisPatCalc: function () {
      return this.prognosisPat.map(function(d, j) {
        d.sum = 0;
        for (let i = 1; i<=52; i ++) {
          d["w_" + i] = this.prognosisStaff[j]["w_" + i] * this.prognosisStaff[j].no_visits
          d.sum += d["w_" + i]
        }
        return d}.bind(this))
    },
    sumTime: function() {
      let sum = 0;
      for (let i = 0; i < this.prognosisStaff.length; i ++) {
        sum += this.prognosisPat[i].tid * this.prognosisStaff[i].no_visits;
      }
      return Math.floor(sum / 60) + ":" + sum % 60;
    }
  },
  created: function () {
    this.$store.state.socket.emit('pageLoaded');
    this.$store.state.socket.on('initialize', function (initData) {
      this.prognosisPat = initData.prognosisPat;
      this.prognosisStaff = initData.prognosisStaff;
      this.outcomeStaff = initData.outcomeStaff;
      this.prognosisRooms = initData.prognosisRooms;
    }.bind(this));
    this.$store.state.socket.on('dataUpdated', function (updatedData) {
      this.prognosisPat = updatedData.prognosisPat;
      this.prognosisStaff = updatedData.prognosisStaff;
      this.prognosisRooms = updatedData.prognosisRooms;
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
    setStartRow: function (i) {
      this.setStartCoords(this.currentWeek, i);
    },
    setSelectedRow: function (i) {
      //TODO! Remove magic number
      this.setSelected(52, i);
    },
    setStartColumn: function (i) {
      this.setStartCoords(i, 0);
    },
    setSelectedColumn: function (i) {
      //TODO! Remove magic number
      this.setSelected(i, 29);
    },
    isSelected: function (x, y) {
      if (this.startCoords.x === null)
        return false;
      let coordsMin = {x: Math.max(this.currentWeek, Math.min(this.startCoords.x, this.endCoords.x)), y: Math.min(this.startCoords.y, this.endCoords.y)}
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
      this.$store.state.socket.emit('updateDB', { prognosisStaff: this.prognosisStaff,
                                                  prognosisRooms: this.prognosisRooms });
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
  .filter-box {
    margin-left: 1em;
  }
  .filter {
    display: none;
  }
  .filter-staff, .filter-rooms, .filter-outcome {
    border-radius: 3px;
    color:transparent;
    user-select: none;   
    margin-right: 0.5em;
    margin-left: 1em;
    padding: 0 0 0 0.2em;
  }

  input[type="checkbox"] + .filter-staff {
    background:steelblue;
  }

  input[type="checkbox"] + .filter-rooms {
    background:maroon;
  }

  input[type="checkbox"] + .filter-outcome {
    background:black;
  }

  input[type="checkbox"]:checked + .filter-staff, 
  input[type="checkbox"]:checked + .filter-rooms,
  input[type="checkbox"]:checked + .filter-outcome {
    /*color:white;*/
    color: transparent;
    user-select: none;
  }

  .care {
    display: grid;
    grid-column-gap: 0;
    user-select: none;
  }
    .capacity {
    grid-template-columns: 13.5em 2.5em 2.5em repeat(52, calc(1.5em)) 2.5em 2.5em;
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
  .outcome {
    background-color: black;
  }  

  input[type='text'] {
    padding-right: 0.4em;
    text-align: right;
    border:0;
    border-bottom: 1px solid black;
  }
  .sum-diagnosis {
    text-align: right;
    padding:0.2em;
  }

  .diagnosis {
    padding:0.2em;
    display: flex;
    align-items: flex-end;
  }
  .time {
    font-size: 0.8em;
  }
  .guesswork {
    background-color: transparent;
    margin: 0.2em;
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
    padding: 0.2em;
    padding-right:0.4em;
    background-color: antiquewhite;
  }
  .heading {
    font-weight: bold;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: 0.1em;
  }
  .week {
    font-weight: bold;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.1em;
  }

  .year {
    display: grid;
    grid-template-columns: 13.5em 2.5em 2.5em repeat(52, calc(1.5em)) 2.5em;

  }
  .diagnosis {
    user-select: none;
  }

  .overview {
    margin:1em;
  }
  .past {
    background-color: antiquewhite;
  }
  .care:hover, .highlighted {
    background-color: rgba(255,0,0,0.1);
  }

  .selected {
    background-color: rgba(255,255,0,0.5);
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
    width:1.5em;
    font-size: 2em;
    text-align: right;
    border:0;
    border-bottom: 1px solid;
  }
  .modal-section {
    display: inline-block;
    width:45%;
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
    float:right;
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
