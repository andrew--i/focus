<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>


      <v-list class="footer">

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>location_on</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Адрес ...'"/>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>phone</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Контакты'"/>
          </v-list-tile-content>
        </v-list-tile>

        <img src="@/static/logo.png" width="70"/>
      </v-list>


    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >

      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-btn v-if="drawer"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
    </v-toolbar>
    <v-content>
        <nuxt/>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        items: [
          {
            icon: 'home',
            title: 'Главная',
            to: '/'
          },
          {
            icon: 'business',
            title: 'Застройщики',
            to: '/developers'
          },
          {
            icon: 'account_balance',
            title: 'Банки',
            to: '/under_develop_b'
          },

          {
            icon: 'group',
            title: 'Риэлторы',
            to: '/under_develop_r'
          },

        ],
        miniVariant: true,
        right: true,
        rightDrawer: false,
        title: 'Анализ надежности застройщиков',
        drawer: false
      }
    }
  }
</script>

<style>
  .footer {
    position: absolute;
    bottom: 0px;
  }
</style>
