<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>Roll The Story</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <!-- <q-drawer v-model="left" side="left" elevated>123</q-drawer> -->
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
      left: true,
      essentialLinks: [
        {
          title: "Dice sets",
          caption: "Choose any",
          icon: "ballot",
          link: "sets"
        }
      ]
    };
  }
};
</script>
