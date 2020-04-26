<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import state from "@/store/";
import actions from "@/store/actions";
import { createPlayer } from "./graphql/mutations";

export default {
  name: "App",
  components: {},
  data() {
    return {
      isAuthorized: false,
      state: state
    };
  },
  async created() {
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
          this.state.isAuthorized = true;
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
      this.state.userInfo = storymoji_session;

      const {
        data: { getPlayer }
      } = await actions.getPlayer({
        id: storymoji_session.id
      });
      if (getPlayer) {
        this.state.userInfo = getPlayer;
        console.log("getPlayer", getPlayer);
      } else {
        this.createPlayer();
      }

      this.$root.$emit("sessionStarted");

      // actions
      //   .getPlayer({
      //     id: storymoji_session.id
      //   })
      //   .then(({ data: { getPlayer } }) => {
      //     this.state.userInfo = getPlayer;
      //     console.log("getPlayer", getPlayer);
      //   })
      //   .catch(() => actions.createPlayer({}))
      //   .then(({ data: { createPlayer } }) => {
      //     this.state.userInfo = createPlayer;
      //     localStorage.setItem(
      //       "storymoji_session",
      //       JSON.stringify(createPlayer)
      //     );
      //     console.log("createPlayer", createPlayer);
      //   });
    } else {
      this.createPlayer();
    }
    // Auth.currentAuthenticatedUser()
    //   .then(user => {
    //     state.isAuthorized = true;
    //     state.userInfo = user;
    //   })
    //   .catch(() => (state.isAuthorized = false));
    // Auth.currentSession().then(res => {
    //   console.log("currentSession", res);
    // });
    // Auth.currentUserPoolUser().then(res => {
    //   console.log("currentUserPoolUser", res);
    // });
    // Auth.currentCredentials().then(res => {
    //   console.log("currentCredentials", res.sessionToken);
    //   state.userInfo = res;
    // });
  },
  methods: {
    async createPlayer() {
      const {
        data: { createPlayer }
      } = await actions.createPlayer({});
      if (createPlayer) {
        this.state.userInfo = createPlayer;
        localStorage.setItem("storymoji_session", JSON.stringify(createPlayer));
        console.log("createPlayer", createPlayer);
      }
    }
  }
};
</script>
