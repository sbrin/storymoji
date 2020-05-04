<template>
  <div id="q-app">
    <router-view />
    <q-ajax-bar ref="bar" position="bottom" color="primary" size="10px" />
  </div>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
// import { version as APP_VERSION } from "../package.json";

// const USER_VERSION = localStorage.getItem("storymoji_version");

// if (USER_VERSION && APP_VERSION !== USER_VERSION) {
//   localStorage.setItem("storymoji_version", APP_VERSION);
//   console.log("reloading");

//   window.location.reload(true);
// } else {
//   localStorage.setItem("storymoji_version", APP_VERSION);
// }

export default {
  name: "App",
  components: {},
  data() {
    return {
      isAuthorized: false
    };
  },
  async created() {
    if (this.userVersion && userVersion !== version)
      AmplifyEventBus.$on("authState", e => {
        switch (e) {
          case "signUp":
            this.$router.push("/signup");
            break;

          case "signIn":
            break;
          // this.$router.push("/login");

          case "signedIn":
            this.$router.push("/");
            this.$store.state.isAuthorized = true;
            break;
          case "confirmSignUp":
            this.$router.push("/signup_confirm");
            break;

          case "forgotPassword":
            break;
          // this.$router.push("/login_forgot");

          default:
        }
        console.log(e);
      });

    window.LOG_LEVEL = "DEBUG";

    let storymoji_session = localStorage.getItem("storymoji_session");

    if (storymoji_session && storymoji_session !== "undefined") {
      storymoji_session = JSON.parse(storymoji_session);
      this.$store.state.userInfo = storymoji_session;

      const {
        data: { getPlayer }
      } = await this.$store.actions.getPlayer({
        id: storymoji_session.id
      });
      if (getPlayer) {
        this.$store.state.userInfo = getPlayer;
        console.log("getPlayer", getPlayer);
      } else {
        this.createPlayer();
      }
    } else {
      this.createPlayer();
    }
  },
  methods: {
    async createPlayer() {
      const {
        data: { createPlayer }
      } = await this.$store.actions.createPlayer({});
      if (createPlayer) {
        this.$store.state.userInfo = createPlayer;
        localStorage.setItem("storymoji_session", JSON.stringify(createPlayer));
        console.log("createPlayer", createPlayer);
        this.$root.$emit("sessionStarted");
        console.log("sessionStarted");
      }
    }
  }
};
</script>
