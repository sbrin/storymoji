<template>
  <div>
    <q-page class="text-center">
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs gutter="xs">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el label="Log In" />
        </q-breadcrumbs>
      </div>

      <amplify-sign-in></amplify-sign-in>
    </q-page>
  </div>
</template>

<script>
import DicePlayer from "@/components/DicePlayer.vue";

export default {
  name: "AuthLogIn",
  data() {
    return {};
  },
  methods: {}
};
</script>
