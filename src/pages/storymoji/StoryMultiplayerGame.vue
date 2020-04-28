<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Storymoji" to="/storymoji" />
        <q-breadcrumbs-el label="Multiplayer" to="/storymoji/multi" />
        <q-breadcrumbs-el label="Game" />
      </q-breadcrumbs>
    </div>

    <template>
      <div class="flex flex-center content-center fit">
        <StoryPlayer
          v-show="isHost || player.playerID === $store.state.userInfo.id"
          v-for="player in players"
          :key="player.id"
          :number="game.dice"
          :id="player.id"
          :name="player.name"
          :items="player.gameItems"
          :isHost="isHost"
          @removePlayer="removePlayer(player.id)"
          @changeName="promptPlayerName = true"
        ></StoryPlayer>
      </div>

      <!-- <q-footer bordered class="bg-grey-2 flex flex-center">
          <q-toolbar class="flex flex-center">
            <q-btn color="blue" flat size="lg" @click="startMultiplayer">New game</q-btn>
          </q-toolbar>
      </q-footer>-->
    </template>
    <q-dialog v-model="promptPlayerName" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter Your Name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="playerName" autofocus required />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Submit" v-close-popup @click="setUserName" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import StoryPlayer from "./StoryPlayer.vue";
import Amplify, { API, graphqlOperation } from "aws-amplify";

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
      prompt: false,
      game_id: "",
      game: {
        players: {}
      },
      promptPlayerName: false,
      playerName: "Anonymous"
    };
  },
  computed: {
    isHost() {
      return this.game.ownerID === this.$store.state.userInfo.id;
    },
    players() {
      if (this.game.players) {
        return this.game.players.items;
      }
      return [];
    },
    gamePlayer() {
      if (this.game.players) {
        return this.players.find(
          item => item.playerID === this.$store.state.userInfo.id
        );
      }
      return {};
    },
    name() {
      return this.$store.state.userInfo.name;
    }
  },
  created() {
    console.log("created");
    this.getGame()
      .then(() => {
        if (!this.$store.state.userInfo.name) {
          this.promptPlayerName = true;
        }
        this.$emit("gameStarted");
        this.$store.actions.onCreateGamePlayer().subscribe({
          next: data => {
            this.getGame();
            console.log("onCreateGamePlayer", data);
          },
          error: error => {
            console.warn("onCreateGamePlayer", error);
          }
        });
        this.$store.actions.onUpdateGamePlayer().subscribe({
          next: data => {
            this.getGame();
            console.log("onUpdateGamePlayer", data);
          },
          error: error => {
            console.warn("onUpdateGamePlayer", error);
          }
        });
      })
      .catch(() => {
        this.$router.push("/storymoji/multi/");
      });
  },
  mounted() {
    console.log("mounted");
    const eventName = this.$store.state.userInfo.id
      ? "gameStarted"
      : "sessionStarted";

    this.$on(eventName, () => {
      console.log("event", eventName);

      if (
        !this.isHost &&
        !this.players.find(
          item => item.playerID === this.$store.state.userInfo.id
        )
      ) {
        this.createPlayer();
        this.getGame();
      }
    });
  },
  methods: {
    getGame() {
      return this.$store.actions
        .getGame({ id: this.id })
        .then(({ data: { getGame } }) => {
          console.log("getGame", getGame);
          if (getGame) {
            this.game = getGame;
          } else {
            return Promise.reject();
          }
        });
    },
    removePlayer(id) {
      this.$store.actions
        .deleteGamePlayer({
          id
        })
        .then(res => {
          console.log("deleteGamePlayer", res);
          this.getGame();
        });
    },
    async createPlayer() {
      let gameItems = await API.get("apid678e88e", "/emoji");

      const createGamePlayer = await this.$store.actions.createGamePlayer({
        playerID: this.$store.state.userInfo.id,
        gameID: this.id,
        name: this.name ? this.name : this.playerName,
        gameItems
      });
      console.log("createGamePlayer", createGamePlayer);
    },
    setUserName() {
      if (!this.isHost) {
        this.$store.actions
          .updatePlayer({
            id: this.$store.state.userInfo.id,
            name: this.playerName
          })
          .then(({ data: { updatePlayer } }) => {
            console.log("updatePlayer", updatePlayer);
            this.promptPlayerName = false;

            this.$store.state.userInfo = updatePlayer;
            localStorage.setItem(
              "storymoji_session",
              JSON.stringify(updatePlayer)
            );

            return this.$store.actions.updateGamePlayer({
              id: this.gamePlayer.id,
              name: this.playerName
            });
          })
          .then(({ data: { updateGamePlayer } }) => {
            console.log("updateGamePlayer", updateGamePlayer);
          });
      }
    }
  }
};
</script>
