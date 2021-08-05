<template>
  <svg viewBox="0 0 1440 100">
    <line x1="480" x2="480" y1="0" y2="100" stroke="black"/>
    <rect class="nonregular" transform="translate(720)" width="30" height="100"/>
    <rect class="timeline" :width="end-start" height="60" :transform="startLine"/>
    <text :x="start-padding" y="65" class="start hidden">{{end===0?'':startText}}</text>
    <text :x="end+padding" y="65" class="end hidden">{{end===0?'':endText}}</text>
  </svg>
</template>

<script>
  /*
    TODO: datum, veckor och markerade helgdagar istf dagX
          välja tidsspann och ändra önskemål, ändra önskemål per dag osv

  */ 
  export default {
    name: "SmallTimeline",
    props: {
      start: Number,
      end: Number,
      startText: String,
      endText: String
    },
    data: function () {
      return {
        padding:20
      }
    },
    computed: {
      startLine () {
        return `translate(${this.start}, 20)`;
      }
    },
    methods: {
    }
  }
</script>
<style scoped>
  text {
    font: 50px sans-serif;
  }

  .hidden {
    opacity: 0;
  }

  svg:hover > .hidden {
    opacity: 100;
  }

  .start {
    text-anchor: end;
  }
  .timeline {
    fill: steelblue;
  }
  .nonregular {
    fill: #ccc;
  }
</style>