<template>
  <v-container>

    <v-layout row>


      <v-flex xs12 sm3 d-flex>
        <v-select
          :items="perView"
          :item-value="v => v"
          v-model="perViewItem"
          @change="updateDevelopers"
        ></v-select>
      </v-flex>

      <v-flex xs12 sm2 d-flex pl-3 pr-3>
        <v-select
          :items="bestOrWorst"
          :item-value="v => v"
          v-model="bestOrWorstItem"
          @change="updateDevelopers"
        ></v-select>
      </v-flex>


      <v-text-field append-outer-icon="search"
                    ml-3
                    pl-3
                    label="Поиск застройщика"
                    v-model="searchDeveloperText"
                    @change="debounceUpdateDevelopers()"
                    hide-details single-line></v-text-field>


      <v-layout row align-center >
<!--        <label>Ваш регион:</label>-->
        <v-autocomplete
          v-model="region"
          :item-value="v => v"
          :items="regions"
          :label="'Регион'"
          prepend-icon="mdi-city"
          :no-data-text="'Не найден'"
          :auto-select-first="true"
          @change="updateDevelopers"
        >
        </v-autocomplete>
      </v-layout>

    </v-layout>

    <div class="developer-charts">
      <developers-chart mode="top" v-bind:developers="developers"/>
    </div>

    <chart-divider v-bind:region="region"/>
    <div class="developer-charts">
      <developers-chart mode="bottom" v-bind:developers="developers"/>
    </div>


  </v-container>

</template>

<script>
  import DevelopersChart from '~/components/DevelopersChart.vue'
  import ChartDivider from '~/components/ChartDivider.vue'
  import _ from 'lodash';


  export default {

    components: {
      DevelopersChart,
      ChartDivider
    },
    async asyncData({$axios}) {
      let response = await $axios.get('/api/regions');
      return response.data;
    },

    mounted() {
      this.region = this.regions[0];
      this.updateDevelopers();

      this.debounceUpdateDevelopers = _.debounce(this.updateDevelopers, 400);
    },
    data() {
      let bestOrWorst = [
        {
          id: 'best',
          text: 'Лучших',
          value: true
        },
        {
          id: 'worst',
          text: 'Худших',
          value: false
        }
      ];
      let perView = [
        {
          id: 'by8',
          text: 'Показать 8',
          value: 8
        },
        {
          id: 'by12',
          text: 'Показать 12',
          value: 12
        },
        {
          id: 'by16',
          text: 'Показать 16',
          value: 16
        }
      ];
      return {
        bestOrWorstItem: bestOrWorst[0],
        perViewItem: perView[0],
        bestOrWorst: bestOrWorst,
        perView: perView,
        searchDeveloperText: '',
        region: null,
        regions: [],
        developers: []
      }
    },
    methods: {

      async updateDevelopers() {
        let regionId = this.region.id;
        let response = await this.$axios.get('/api/developers', {
          params: {
            regionId: regionId,
            limit: this.perViewItem.value,
            best: this.bestOrWorstItem.value ? true : null,
            developer: this.searchDeveloperText
          }
        });
        this.developers.splice(0, this.developers.length);
        if (response.data && response.data.developers)
          response.data.developers.forEach(d => this.developers.push(d));
      },

    }
  }
</script>

<style>
</style>
