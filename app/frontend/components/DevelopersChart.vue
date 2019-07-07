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
        return this.isTop() ? data.name : data.minPriceM2;
      },

      getBarLabelOffset(index, developers) {
        if (!this.isTop())
          return -2;

        let defaultValue = 20;
        if (developers < 2) {
          return defaultValue;
        }

        let value = defaultValue;
        let curDeveloper = developers[index].developer;
        if (index < developers.length - 1) {
          let nextDeveloper = developers[index + 1].developer;
          if (curDeveloper.rating === nextDeveloper.rating) {

            if (index > 0) {
              let prevDeveloper = developers[index - 1].developer;
              if (curDeveloper.rating === prevDeveloper.rating)
                value = defaultValue * 6;
              else
                value = defaultValue * 3;
            } else
              value = defaultValue * 3;
          } else
            value = defaultValue;
        }
        if (curDeveloper.rating === "0.0")
          return -value;
        return value;
      },

      updateChart() {
        let developers = this.developers;

        let yFunc;
        if (this.isTop()) {
          yFunc = d => parseFloat(d.rating) + 1;
        } else {
          yFunc = d => -d.minPriceM2;
        }


        let data = {
          labels: developers.map(() => ''),
          datasets: [
            {
              developersDataSet: true,
              hoverBackgroundColor: 'rgba(129,212,250 ,1)',
              data: developers.map(d => {
                return {y: yFunc(d), developer: d}
              })
            },
          ]
        };

        if (this.isTop()) {

          let backgroundColors = developers.map(d => {
              let rating = parseFloat(d.rating);
              if (rating < 1) {
                return 'rgb(217,61,91)'
              } else if (rating < 3) {
                return 'rgb(129,167,217)'
              }
              return 'rgb(113,217,168)'
            }
          );

          data.datasets[0].backgroundColor = backgroundColors;

        }

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
                if (dataset.developersDataSet) {
                  let meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach(function (bar, index) {
                    let data = dataset.data[index];
                    let topLabelOffset = self.getBarLabelOffset(index, dataset.data);
                    ctx.fillText(self.getBarLabel(data.developer), bar._model.x, bar._model.y + topLabelOffset);
                  });
                }
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

                let items = [
                  `Название: \t ${developer.name}`,
                  `Рейтинг ЕРЗ: \t    ${developer.rating}`,
                  developer.regionPercent ? `Доля в регионе: \t${developer.regionPercent}` : '',
                  developer.foundationYear ? `Год основания: \t ${developer.foundationYear}` : ''
                ];
                return items.join('\n');
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
                display: false,
                max: 6
              }

            }],
            xAxes: [{
              gridLines: {
                drawBorder: false,
                // display: false
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
