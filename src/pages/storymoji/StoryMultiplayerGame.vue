<template>
  <q-page>
    <q-page class="text-center">
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs gutter="xs">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el label="Storymoji" to="/storymoji" />
          <q-breadcrumbs-el label="Multiplayer" to="/storymoji/multi" />
          <q-breadcrumbs-el label="Game" />
        </q-breadcrumbs>
      </div>

      <template v-if="isHost">
        <div class="flex flex-center content-center fit">
          <StoryPlayer
            v-for="(player, idx) in players"
            :key="idx + run_id"
            :number="game.dice"
            :index="idx"
            :id="player.id"
            @removePlayer="removePlayer"
          ></StoryPlayer>
        </div>

        <!-- <q-footer bordered class="bg-grey-2 flex flex-center">
          <q-toolbar class="flex flex-center">
            <q-btn color="blue" flat size="lg" @click="startMultiplayer">New game</q-btn>
          </q-toolbar>
        </q-footer>-->
      </template>
    </q-page>
  </q-page>
</template>

<script>
import StoryPlayer from "./StoryPlayer.vue";
import state from "@/store/";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import actions from "@/store/actions";

export default {
  name: "StoryMultiplayerGame",
  components: {
    StoryPlayer
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      run_id: 0,
      started: false,
      // players: 0,
      state: state,
      prompt: false,
      game_id: "",
      game: {
        players: {}
      }
    };
  },
  computed: {
    isHost() {
      return this.game.ownerID === this.state.userInfo.id;
    },
    players() {
      const { items } = this.game.players;
      return items ? items : [];
    }
  },
  created() {
    console.log("created");
    this.getGame().then(() => {
      this.$emit("gameStarted");
      actions.onCreateGamePlayer().subscribe({
        next: data => {
          this.getGame();
          console.log("onCreateGamePlayer", data);
        },
        error: error => {
          console.warn("onCreateGamePlayer", error);
        }
      });
    });
  },
  mounted() {
    console.log("mounted");
    const eventName = this.state.userInfo.id ? "gameStarted" : "sessionStarted";

    this.$on(eventName, () => {
      console.log(eventName);

      if (
        !this.isHost &&
        !this.players.find(item => item.playerID === this.state.userInfo.id)
      ) {
        actions
          .createGamePlayer({
            playerID: this.state.userInfo.id,
            gameID: this.id
          })
          .then(createGamePlayer => {
            console.log("createGamePlayer", createGamePlayer);
          });
      }
      // actions.getGame({ id: this.id }).then(({ data: { getGame } }) => {
      //   console.log("getGame", getGame);
      //   this.game = getGame;

      // });
    });
  },
  methods: {
    getGame() {
      return actions.getGame({ id: this.id }).then(({ data: { getGame } }) => {
        console.log("getGame", getGame);
        this.game = getGame;
      });
    },
    removePlayer(id) {
      actions
        .deleteGamePlayer({
          id
        })
        .then(res => {
          console.log("deleteGamePlayer", res);
          this.getGame();
        });
    },
    startMultiplayer() {
      // this.started = true;
      // this.$appSync
      //   .mutate({
      //     mutation: gql(mutations.createGame),
      //     variables: {
      //       input: {
      //         ownerID: state.userInfo.sessionToken,
      //         type: "storycards"
      //       }
      //     }
      //   })
      //   .then(result => {
      //     console.log(result.data);
      //   });
    },
    joinGame() {
      // this.$router.push(`/storimoji/multi/${this.game_id}`)
    }
  }
};
</script>
