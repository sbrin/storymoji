<template>
  <div>
    <q-page class="text-center">
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs gutter="xs">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el label="Forgot password" />
        </q-breadcrumbs>
      </div>

      <amplify-forgot-password></amplify-forgot-password>
    </q-page>
  </div>
</template>

<script>

export default {
  name: "AuthLogIn",
  data() {
    return {};
  },
  methods: {}
};
</script>
