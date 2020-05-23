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
      <div class="q-pb-md column flex-center" v-if="isHost">
        <div class="q-pb-md">Invite players using this link:</div>
        <q-input
          class="text-primary"
          dense
          outlined
          :value="location"
          @click="
            e => {
              e.target.select();
            }
          "
        />
      </div>
      <div class="flex flex-center content-center fit">
        <StoryPlayer
          v-show="isHost || player.playerID === $store.state.userInfo.id"
          v-for="player in players"
          :key="player.id"
          :number="game.size"
          :id="player.id"
          :name="player.name"
          :items="player.playerItems"
          :isHost="isHost"
          @removePlayer="removeGamePlayer(player.id)"
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
          <q-input outlined dense v-model="playerName" autofocus required />
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
import { API } from "aws-amplify";
import unsubscribe from "@/mixins/unsubscribe";

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
  mixins: [unsubscribe],
  computed: {
    isHost() {
      if (
        this.game.ownerID &&
        this.game.ownerID === this.$store.state.userInfo.id
      ) {
        return true;
      }
      return false;
    },
    players() {
      if (this.game.players) {
        return this.game.players.items;
      }
      return [];
    },
    gamePlayer() {
      if (this.game.players) {
        return this.game.players.items.find(
          item => item.playerID === this.$store.state.userInfo.id
        );
      }
      return {};
    },
    name() {
      return this.$store.state.userInfo.name;
    },
    location() {
      return window.document.location;
    }
  },
  watch: {
    "$route.params.id": {
      handler: function(a, b) {
        this.getGame()
          .then(() => {
            if (!this.name) {
              this.promptPlayerName = true;
            }
            this.$emit("sessionStarted");
          })
          .catch(e => {
            console.log(e);

            this.$router.push("/storymoji/multi/");
          });
      }
    }
  },
  created() {
    console.log("created");

    this.playerName = this.name ? this.name : this.playerName;

    this.$on("sessionStarted", () => {
      if (
        !this.isHost &&
        !this.players.find(
          item => item.playerID === this.$store.state.userInfo.id
        )
      ) {
        this.createGamePlayer();
        this.getGame();
      }
    });
  },
  mounted() {
    console.log("mounted");

    this.getGame()
      .then(() => {
        if (!this.name) {
          this.promptPlayerName = true;
        }
        this.$emit("sessionStarted");
        this.subscribeToChanges();
      })
      .catch(e => {
        console.log(e);

        this.$router.push("/storymoji/multi/");
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
    removeGamePlayer(id) {
      this.$store.actions
        .deleteGamePlayer({
          id
        })
        .then(res => {
          console.log("deleteGamePlayer", res);
        });
    },
    async createGamePlayer() {
      let playerItems = await API.get(
        "apid678e88e",
        `/emoji?count=${this.game.size}`
      );

      const createGamePlayer = await this.$store.actions.createGamePlayer({
        playerID: this.$store.state.userInfo.id,
        gameID: this.id,
        name: this.name ? this.name : this.playerName,
        playerItems
      });
      console.log("createGamePlayer", createGamePlayer);
    },
    setUserName() {
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
    },
    subscribeToChanges() {
      this.unsubscribe.push(
        this.$store.actions
          .onCreateGamePlayer({
            gameID: this.game.id
          })
          .subscribe({
            next: data => {
              this.getGame();
              console.log("onCreateGamePlayer", data);
            },
            error: error => {
              console.warn("onCreateGamePlayer", error);
            }
          })
      );
      this.unsubscribe.push(
        this.$store.actions
          .onUpdateGamePlayer({
            gameID: this.game.id
          })
          .subscribe({
            next: data => {
              this.getGame();
              console.log("onUpdateGamePlayer", data);
            },
            error: error => {
              console.warn("onUpdateGamePlayer", error);
            }
          })
      );
      this.unsubscribe.push(
        this.$store.actions
          .onDeleteGamePlayer({
            gameID: this.game.id
          })
          .subscribe({
            next: data => {
              this.getGame();
              console.log("onDeleteGamePlayer", data);
            },
            error: error => {
              console.warn("onDeleteGamePlayer", error);
            }
          })
      );
    }
  }
};
</script>
