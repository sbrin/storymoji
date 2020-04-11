<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { amplify_components } from "aws-amplify-vue";
import { AmplifyEventBus } from "aws-amplify-vue";

export default {
  name: "App",
  components: {
    ...amplify_components
  },
  created() {},
  mounted() {
    AmplifyEventBus.$on("authState", e => {
      switch (e) {
        case "signUp":
          this.$router.push("/signup");
          break;
        case "signIn":
          this.$router.push("/login");
          break;
        case "confirmSignUp":
          this.$router.push("/signup_confirm");
          break;
        case "forgotPassword":
          this.$router.push("/login_forgot");
          break;
        default:
          console.log(e);
      }
    });
  }
};
</script>
