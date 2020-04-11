<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>Roll The Story</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" elevated>
      <q-scroll-area class="fit">
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            :active="!!~$route.path.indexOf(menuItem.route)"
            :to="menuItem.route"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" color="grey-5" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  components: {},
  data() {
    return {
      left: false,
      miniState: false,
      menuList: [
        {
          icon: "fas fa-dice",
          route: "/storymoji",
          label: "Storymoji"
        },
        {
          icon: "fas fa-hand-scissors",
          route: "/dominoes",
          label: "Dominoes"
        }
      ]
    };
  },
  created() {}
};
</script>
