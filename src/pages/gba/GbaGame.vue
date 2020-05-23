<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Guns Bombs Angels" to="/gba" />
        <q-breadcrumbs-el label="Game" />
      </q-breadcrumbs>
    </div>

    <div class="q-pb-md column flex-center" v-if="isHost && !started">
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
    <div class="q-pb-md row flex-center" v-if="!!game.status">
      <div
        class="gba-game col-md-auto q-ma-md"
        :class="{
          'gba-game_four': game.size === 4,
          'gba-game_five': game.size === 5
        }"
      >
        <div></div>
        <div class="gba-game__top">
          <div v-for="(item, idx) in new Array(game.size)" :key="idx">
            {{ idx + 1 }}
          </div>
        </div>
        <div class="gba-game__left">
          <div
            v-for="(item, idx) in ['A', 'B', 'C', 'D', 'E'].slice(0, game.size)"
            :key="idx"
          >
            {{ item }}
          </div>
        </div>
        <div class="gba-game__wrapper">
          <div
            class="gba-game__cell"
            v-for="cell in game.gameItems"
            :key="cell.id"
          >
            <div
              class="gba-cell"
              v-if="cell.status === 'open'"
              @click="closeCell(cell.id)"
            >
              {{ cell.content }}
            </div>
            <div
              class="gba-cell"
              v-if="cell.status !== 'open'"
              @click="openCell(cell.id)"
            >
              &nbsp;
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-4 q-ma-md">
        <div class="row flex-center q-gutter-md">
          <GbaTeam
            v-for="team in game.gameTeams"
            :key="team.id"
            :team="team"
            :isHost="isHost"
            :waitingForResponse="waitingForResponse"
            :winner="isWinner(team.id)"
            @changeName="changeTeamName(team.id)"
            @removeTeam="removeTeam(team.id)"
            @scoreDown="
              team.score -= 1;
              updateGameTeams();
            "
            @scoreUp="
              team.score += 1;
              updateGameTeams();
            "
          ></GbaTeam>
        </div>
        <div class="flex flex-center q-pa-md" v-show="isHost && !started">
          <q-btn
            color="primary"
            size="lg"
            label="Add team"
            :disabled="waitingForResponse"
            @click="addTeam"
          ></q-btn>
        </div>
      </div>
    </div>

    <q-footer
      v-if="isHost && !started"
      bordered
      class="bg-grey-2 flex flex-center"
    >
      <q-toolbar class="flex flex-center">
        <q-btn color="blue" flat size="lg" @click="startGame">Start game</q-btn>
      </q-toolbar>
    </q-footer>

    <q-dialog v-model="promptTeamName" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter Team Name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input outlined dense v-model="teamName" autofocus required />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Submit" v-close-popup @click="setTeamName" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import GbaTeam from "./GbaTeam.vue";
import unsubscribe from "@/mixins/unsubscribe";
import shuffleArray from "@/mixins/shuffleArray";

export default {
  name: "GbaGame",
  components: {
    GbaTeam
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      game: {
        gameTeams: [],
        gameItems: []
      },
      items: [],
      waitingForResponse: false,
      promptTeamName: false,
      teamName: "",
      teamID: "",
      teamCounter: 0
    };
  },
  mixins: [unsubscribe, shuffleArray],
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
    location() {
      return window.document.location;
    },
    started() {
      return this.game.status !== "new";
    },
    isWinner() {
      return id => {
        if (this.game.status === "new") {
          return false;
        }
        const alive = this.game.gameTeams.filter(team => team.score > 0);
        if (alive.length === 0) {
          return false;
        }
        if (alive.length === 1) {
          return alive[0]["id"] === id;
        }
        if (!this.game.gameItems.find(item => item.status === "closed")) {
          let score_winner = alive[0];
          let winners = [alive[0]];

          for (let i = 1; i < alive.length; i++) {
            if (alive[i].score === score_winner.score) {
              winners.push(alive[i]);
            }
            if (alive[i].score > score_winner.score) {
              score_winner = alive[i];
              winners = [alive[i]];
            }
          }
          if (winners.length > 0) {
            return !!winners.find(team => team.id === id);
          }
          return score_winner.id === id;
        }
      };
    }
  },
  watch: {
    "$route.params.id": {
      handler: function() {
        this.getGame()
          .then(() => {
            this.$emit("sessionStarted");
          })
          .catch(e => {
            console.log(e);

            this.$router.push("/gba");
          });
      }
    }
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");

    this.getGame()
      .then(getGame => {
        this.$emit("sessionStarted");
        if (getGame.status === "new") {
          this.generateItems();
          this.teamCounter = this.game.gameTeams.length;
        }
        this.subscribeToChanges();
      })
      .catch(e => {
        console.log(e);

        this.$router.push("/gba");
      });
  },
  methods: {
    getGame() {
      if (!this.waitingForResponse) {
        // this.waitingForResponse = true;
        return this.$store.actions
          .getGame({ id: this.id })
          .then(({ data: { getGame } }) => {
            if (getGame) {
              console.log("getGame", getGame);
              this.game = getGame;
              // this.waitingForResponse = false;
              if (this.game.status === "started") {
                let count_winners = this.game.gameTeams.filter(
                  team => team.score > 0
                ).length;
                if (count_winners === 1) {
                  this.game.gameItems = this.game.gameItems.map(item => {
                    item.status = "open";
                    return item;
                  });
                }
              }
              return getGame;
            } else {
              return Promise.reject();
            }
          });
      }
    },
    startGame() {
      this.$store.actions
        .updateGame({
          id: this.game.id,
          status: "started",
          gameItems: this.items
        })
        .then(({ data: { updateGame } }) => {
          console.log("updateGame", updateGame);
        });
    },
    subscribeToChanges() {
      this.unsubscribe.push(
        this.$store.actions
          .onUpdateGame({
            id: this.game.id
          })
          .subscribe({
            next: data => {
              this.getGame();
              console.log("onUpdateGame", data);
            },
            error: error => {
              console.warn("onUpdateGame", error);
            }
          })
      );
    },
    generateItems() {
      const length = this.game.size ** 2;
      this.items = ["💩"];

      for (let i = 0; i < this.game.size; i++) {
        this.items.push("🔫");
        this.items.push("💣");
        this.items.push("👼");
      }

      for (let i = this.items.length; i < length; i++) {
        this.items.push("❓");
      }

      this.items = this.shuffleArray(this.items);

      this.items = this.items.map((item, idx) => ({
        id: idx,
        content: item,
        status: "closed"
      }));
      // this.game.gameItems = this.items;
      console.log(this.items);
    },
    openCell(id) {
      if (!this.waitingForResponse && this.started && this.isHost) {
        this.waitingForResponse = true;
        this.$store.actions
          .updateGame({
            id: this.game.id,
            gameItems: this.game.gameItems.map(item => {
              if (item.id === id) {
                item.status = "open";
              }
              return {
                id: item.id,
                status: item.status,
                content: item.content
              };
            })
          })
          .then(({ data: { updateGame } }) => {
            console.log("updateGame", updateGame);
            this.waitingForResponse = false;
          });
      }
    },
    closeCell(id) {
      if (!this.waitingForResponse && this.started && this.isHost) {
        this.waitingForResponse = true;
        this.$store.actions
          .updateGame({
            id: this.game.id,
            gameItems: this.game.gameItems.map(item => {
              if (item.id === id) {
                item.status = "closed";
              }
              return {
                id: item.id,
                status: item.status,
                content: item.content
              };
            })
          })
          .then(({ data: { updateGame } }) => {
            console.log("updateGame", updateGame);
            this.waitingForResponse = false;
          });
      }
    },
    updateGameTeams(gameTeams) {
      if (!this.waitingForResponse) {
        this.waitingForResponse = true;

        this.$store.actions
          .updateGame({
            id: this.game.id,
            gameTeams: gameTeams
              ? gameTeams
              : this.game.gameTeams.map(team => ({
                  id: team.id,
                  name: team.name,
                  score: team.score
                }))
          })
          .then(({ data: { updateGame } }) => {
            console.log("updateGame", updateGame);
            this.waitingForResponse = false;
          });
      }
    },
    addTeam() {
      this.teamCounter += 1;
      this.game.gameTeams.push({
        id: this.teamCounter,
        name: `Team ${this.teamCounter}`,
        score: this.game.size
      });
      this.updateGameTeams();
    },
    changeTeamName(id) {
      this.teamID = id;
      const { name } = this.game.gameTeams.find(
        team => team.id === this.teamID
      );
      if (name) {
        this.teamName = name;
        this.promptTeamName = true;
      }
    },
    setTeamName() {
      const gameTeams = this.game.gameTeams.map(team => {
        let name;
        if (this.teamID === team.id) {
          name = this.teamName;
        } else {
          name = team.name;
        }
        return {
          id: team.id,
          name,
          score: team.score
        };
      });
      this.updateGameTeams(gameTeams);
    },
    removeTeam(id) {
      this.game.gameTeams = this.game.gameTeams.filter(team => team.id !== id);
      this.updateGameTeams();
    }
  }
};
</script>
<style lang="sass" scoped>
$cell-size: 12vmin
$cell-size_sm: 16vmin

.gba-game
  display: grid
  grid-template-rows: 2rem auto
  grid-template-columns: 2rem auto
  text-align: center
  width: fit-content
  &_four
    .gba-game__top
      grid-template-columns: repeat(4, $cell-size)
      @media screen and (max-width: 640px)
        grid-template-columns: repeat(4, $cell-size_sm)
    .gba-game__left
      grid-template-rows: repeat(4, $cell-size)
      @media screen and (max-width: 640px)
        grid-template-rows: repeat(4, $cell-size_sm)
    .gba-game__wrapper
      grid-template-rows: repeat(4, $cell-size)
      grid-template-columns: repeat(4, $cell-size)
      @media screen and (max-width: 640px)
        grid-template-rows: repeat(4, $cell-size_sm)
        grid-template-columns: repeat(4, $cell-size_sm)
  &_five
    .gba-game__top
      grid-template-columns: repeat(5, $cell-size)
      @media screen and (max-width: 640px)
        grid-template-columns: repeat(5, $cell-size_sm)
    .gba-game__left
      grid-template-rows: repeat(5, $cell-size)
      @media screen and (max-width: 640px)
        grid-template-rows: repeat(5, $cell-size_sm)
    .gba-game__wrapper
      grid-template-rows: repeat(5, $cell-size)
      grid-template-columns: repeat(5, $cell-size)
      @media screen and (max-width: 640px)
        grid-template-rows: repeat(5, $cell-size_sm)
        grid-template-columns: repeat(5, $cell-size_sm)
  &__top, &__left
    display: grid
    align-items: center
    font-size: 1.2rem
  &__wrapper
    display: grid
    border: 1px solid #Ccc
  &__cell
    border: 1px solid #Ccc
    width: 100%
    height: 100%
    text-align: center
    display: flex
    align-items: center
    justify-content: center
    font-size: 8vmin
    @media screen and (max-width: 640px)
      font-size: 10vmin
.gba-cell
  width: 100%
  cursor: pointer
</style>
