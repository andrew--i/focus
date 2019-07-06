<script>
  import {Bar} from 'vue-chartjs'

  export default {
    extends: Bar,
    props: ['developers', 'mode'],


    watch: {
      developers: function (newVal, oldVal) {
        this.updateChart();
      }
    },

    mounted() {
      this.updateChart();
    },

    methods: {
      isTop() {
        return (this.mode ? this.mode : 'top') === 'top';
      },
      getBarLabel(data) {
        return this.isTop() ? data.name : data.minPriceM2 + ' р/м2';
      },
      updateChart() {
        let developers = this.developers;

        let yFunc;
        if (this.isTop()) {
          yFunc = d => d.rating;
        } else {
          yFunc = d => -d.minPriceM2;
        }


        let data = {
          labels: developers.map(() => ''),
          datasets: [
            {
              hoverBackgroundColor: 'rgba(129,212,250 ,1)',
              data: developers.map(d => {
                return {y: yFunc(d), developer: d}
              })
            }]
        };

        this.renderChart(data, this.defaultOptions);
      }

    },

    data() {
      let self = this;
      return {
        defaultOptions: {
          hover: {
            animationDuration: 0
          },
          animation: {
            duration: 1,
            onComplete: function () {
              let chartInstance = this.chart,
                ctx = chartInstance.ctx;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              ctx.font = '15px Roboto';
              this.data.datasets.forEach(function (dataset, i) {
                let meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                  let data = dataset.data[index];

                  ctx.fillText(self.getBarLabel(data.developer), bar._model.x, bar._model.y + (self.isTop() ? 20 : -2));

                });
              });
            }
          },
          tooltips: {
            position: 'nearest',
            bodyFontFamily: 'Roboto',
            bodySpacing: 5,
            xPadding: 10,
            yPadding: 10,
            bodyFontSize: 15,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            callbacks: {
              title: function (tooltipItem, data) {
                let index = tooltipItem[0].index;
                return data['labels'][index];
              },
              label: function (tooltipItem, data) {
                return ''
              },
              afterLabel: function (tooltipItem, data) {
                let index = tooltipItem.index;
                let developer = data.datasets[0].data[index].developer;

                return `Рейтинг ЕРЗ: \t    ${developer.rating}\nДоля в регионе: \t${developer.regionPercent}\nГод основания: \t ${developer.foundationYear}`;
              }
            }
          },

          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{

              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                beginAtZero: true,
                display: false
              }

            }],
            xAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              },
              ticks: {
                mirror: !this.isTop()
              }
            }]
          }
        }
      }
    },
  }
</script>
<style>
</style>
