<template>
  <div>
    <q-page class="text-center">
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs gutter="xs">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el label="Sign Up" />
        </q-breadcrumbs>
      </div>

      <amplify-sign-up :signUpConfig="signUpConfig"></amplify-sign-up>
    </q-page>
  </div>
</template>

<script>
import DicePlayer from "@/components/DicePlayer.vue";
import { AmplifyEventBus } from "aws-amplify-vue";

export default {
  name: "StoryMoji",
  data() {
    return {
      signUpConfig: {
        hideAllDefaults: true,
        success: false,
        signUpFields: [
          {
            label: "Username",
            key: "username",
            required: true,
            displayOrder: 1,
            type: "string",
            signUpWith: true
          },
          {
            label: "Email",
            key: "email",
            required: true,
            displayOrder: 2,
            type: "string",
            signUpWith: true
          },
          {
            label: "Password",
            key: "password",
            required: true,
            displayOrder: 3,
            type: "password"
          }
        ]
      }
    };
  },
  mounted() {
    this.AmplifyEventBus.$on("authState", e => {
      // if (e === "confirmSignUp") {
      //   this.$
      // }
    });
  },
  methods: {}
};
</script>
