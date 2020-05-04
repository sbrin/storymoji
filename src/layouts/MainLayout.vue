<template>
  <q-layout view="hHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>Roll The Story</q-toolbar-title>
        <!-- <div v-if="!state.isAuthorized" class="flex items-center row">
          <q-btn flat label="Sign up" />
          <q-btn flat label="Log in" to="/login" />
        </div>
        <div v-else-if="state.isAuthorized" class="flex items-center row">
          <q-btn flat icon="exit_to_app" @click="signOut" title="Sign Out" />
        </div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" bordered>
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
            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>
          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import state from "@/store/";
import { Auth } from "aws-amplify";

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
          icon: "view_module",
          route: "/dominoes",
          label: "Dominoes"
        },
        {
          icon: "fas fa-bomb",
          route: "/gba",
          label: "Guns Bombs Angels"
        },
        {
          icon: "announcement",
          route: "/taboo",
          label: "Taboo"
        }
      ],
      state: state
    };
  },
  created() {},
  methods: {
    signOut() {
      Auth.signOut().then(() => {
        state.isAuthorized = false;
      });
    }
  }
};
</script>
