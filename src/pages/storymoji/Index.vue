<template>
  <div>
    <q-page class="text-center">
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs gutter="xs">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el label="Storymoji" />
        </q-breadcrumbs>
      </div>

      <h2 class="q-mb-sm">StoryMoji</h2>
      <h5 class="q-mt-sm">Emoji cards for storytelling game</h5>

      <p class="q-gutter-sm">
        <q-btn color="primary" size="lg" to="storymoji/solo">Solo game</q-btn>

        <q-btn color="primary" size="lg" to="storymoji/multi"
          >Multiplayer</q-btn
        >
      </p>
      <router-view />
    </q-page>
  </div>
</template>

<script>
import DicePlayer from "@/components/DicePlayer.vue";

export default {
  name: "StoryMoji",
  data() {
    return {};
  },
  methods: {}
};
</script>
