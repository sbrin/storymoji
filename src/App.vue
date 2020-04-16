<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { amplify_components } from "aws-amplify-vue";
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import state from "@/store/";

export default {
  name: "App",
  components: {
    ...amplify_components
  },
  data() {
    return {
      isAuthorized: false
    };
  },
  beforeCreate() {
    AmplifyEventBus.$on("authState", e => {
      switch (e) {
        case "signUp":
          break;
        // this.$router.push("/signup");

        case "signIn":
          break;
        // this.$router.push("/login");

        case "signedIn":
          break;
          this.$router.push("/");
          state.isAuthorized = true;
        case "confirmSignUp":
          break;
        // this.$router.push("/signup_confirm");

        case "forgotPassword":
          break;
        // this.$router.push("/login_forgot");

        default:
      }
      console.log(e);
    });
  },
  created() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        state.isAuthorized = true;
        state.userInfo = user;
      })
      .catch(() => (state.isAuthorized = false));
    Auth.currentSession().then(res => {
      console.log(res);
    });
  }
};
</script>
