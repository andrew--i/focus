<template>


  <v-container bg fill-height grid-list-md text-xs-center class="bg">

    <v-layout class="text-xs-center" column>

      <div>
        <img class="logo-title" src="@/static/Group.png"/>
      </div>
      <div>
        <h1 class="header-title">
          Поможем грамотно выбрать
        </h1>
      </div>


      <v-layout row class="menus">

        <v-flex
          v-for="(item, i) in items"
          :key="i"

        >
          <div v-bind:class="{'active': isActive(item), 'notActive': !isActive(item)}" class="menu-item"
               router
               exact
               :to="item.to"
               @click="navigateTo(item.to)"
               @mouseover="activeItem = item">

            <div class="menu-icon">
              <v-icon>{{ item.icon }}</v-icon>

            </div>
            <label class="menu-label">{{item.label}}</label>
          </div>

        </v-flex>

      </v-layout>

      <label class="menu-footer">
        Открытый доступ к информации о застройщиках, банках, риэлторах и их аналитическим данным
      </label>


      <label>на основе единого реестра <a class="header-link" href="https://erzrf.ru/">застройщиков </a></label>
    </v-layout>
  </v-container>


</template>

<script>
  export default {
    methods: {
      isActive(item) {
        return item === this.activeItem;
      },
      navigateTo(to) {
        this.$router.push(to);
      }
    },
    data() {
      return {
        activeItem: null,
        items: [
          {
            label: 'ЗАСТРОЙЩИКА',
            icon: 'business',
            to: '/developers'
          },
          {
            label: 'БАНК',
            icon: 'account_balance',
            to: '/developers'
          },
          {
            label: 'РИЭЛТОРА',
            icon: 'group',
            to: '/developers'
          }
        ]
      }
    }
  }
</script>

<style>
  .header-title {
    font-size: 79px;
    font-family: circle;
  }

  .logo-title {
    padding-top: 100px;
  }

  .menus {
    padding-top: 70px;
  }

  bg {
    background-image: url("~assets/bg.jpg");
    background-size: cover;
  }

  .active {
    background-image: url("~assets/active.png");
    background-size: cover;
  }

  .notActive {
    background-image: url("~assets/no-active.png");
    background-size: cover;
  }

  .menu-item {
    width: 296px;
    height: 296px;
    cursor: pointer;
  }

  .menu-icon i {
    font-size: 101px;
    color: white !important;
    padding-top: 60px;
  }

  .menu-label {
    font-size: 28px;
    color: white;
    font-weight: bold;
    font-family: circle;
  }

  .menu-footer {
    font-family: circle;
    font-size: 30px;
  }

  .header-link {
    text-decoration: none;
    text-underline: none;
    color: black;
  }
</style>
