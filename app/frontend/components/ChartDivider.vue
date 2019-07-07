<template>
  <div class="developer-divider">
    <label>
      Рейтинг застройщиков
    </label>
    <v-layout align-center>
      <v-spacer class="line"></v-spacer>
      <label class="region-caption">{{region ? region.text : ''}}</label>
      <v-spacer class="line"></v-spacer>
    </v-layout>
    <label>
      Минимальная стоимость м2, р/м2
    </label>
  </div>
</template>

<style>
  .line {
    border-bottom: 1px solid black;
  }

  .region-caption {
    font-size: 20px;
    padding-right: 45px;
    padding-left: 45px;
  }

  .developer-divider {

    padding-bottom: 20px;
  }
</style>

<script>
  export default {
    props:['region']
  }
</script>
