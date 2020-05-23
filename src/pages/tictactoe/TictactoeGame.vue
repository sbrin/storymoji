<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Tic Tac Emoji" to="/tictactoe" />
        <q-breadcrumbs-el label="Game" />
      </q-breadcrumbs>
    </div>

    <div class="q-pb-md row flex-center" v-if="!!game.status">
      <div class="tictactoe-game col-md-auto q-ma-md">
        <div></div>
        <div class="tictactoe-game__top text-grey">
          <div v-for="(item, idx) in ['1', '2', '3']" :key="idx">
            {{ idx + 1 }}
          </div>
        </div>
        <div class="tictactoe-game__left text-grey">
          <div v-for="(item, idx) in ['A', 'B', 'C']" :key="idx">
            {{ item }}
          </div>
        </div>
        <div class="tictactoe-game__wrapper">
          <div
            class="tictactoe-game__cell"
            v-for="cell in game.gameItems"
            :key="cell.id"
          >
            <div
              class="tictactoe-cell"
              @click="makeMove(cell)"
              v-if="cell.status === 'new'"
            >
              {{ cell.content }}
            </div>
            <div
              class="tictactoe-cell"
              @click="makeMove(cell)"
              v-if="cell.status === 'closed'"
            >
              {{ cell.state === "x" ? "❌" : ""
              }}{{ cell.state === "o" ? "⭕️" : "" }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-3 q-ma-md">
        <div class="row flex-center q-gutter-md">
          <TictactoeTeam
            v-for="(team, idx) in game.gameTeams"
            :key="team.id"
            :team="team"
            :isHost="isHost"
            :waitingForResponse="waitingForResponse"
            :winner="isWinner(team.id)"
            :content="idx === 0 ? '❌' : '⭕️'"
            :active="activeTeam === team.id"
            :gameStatus="game.status"
            @changeName="changeTeamName(team.id)"
            @makeMove="activeTeam = team.id"
          ></TictactoeTeam>
        </div>
      </div>
    </div>
    <q-footer bordered class="bg-grey-2 flex flex-center">
      <q-toolbar class="flex flex-center">
        <q-btn color="blue" flat size="lg" @click="restartGame">Restart</q-btn>
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
import { API } from "aws-amplify";
import TictactoeTeam from "./TictactoeTeam.vue";
import shuffleArray from "@/mixins/shuffleArray";
import unsubscribe from "@/mixins/unsubscribe";

export default {
  name: "TictactoeGame",
  components: {
    TictactoeTeam
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
      waitingForResponse: false,
      promptTeamName: false,
      teamName: "",
      teamID: "",
      activeTeam: ""
    };
  },
  mixins: [shuffleArray, unsubscribe],
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
    isWinner() {
      return id => {
        const STATE = id === "1" ? "x" : "o";
        return this.checkWinner(this.game.gameItems, STATE);
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

            this.$router.push("/tictactoe");
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
        this.subscribeToChanges();
      })
      .catch(e => {
        console.log(e);

        this.$router.push("/tictactoe");
      });
  },
  methods: {
    checkWinner(items, state) {
      const ITEMS_CONTENT = items.map(item => item.state);
      const WINNERS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < WINNERS.length; i++) {
        let matches = 0;
        WINNERS[i].forEach(winner => {
          if (state === ITEMS_CONTENT[winner]) {
            matches += 1;
          }
        });
        if (matches === 3) {
          return true;
        }
      }
      return false;
    },
    getGame() {
      if (!this.waitingForResponse) {
        // this.waitingForResponse = true;
        return this.$store.actions
          .getGame({ id: this.id })
          .then(({ data: { getGame } }) => {
            if (getGame) {
              console.log("getGame", getGame);
              this.game = getGame;
              return getGame;
            } else {
              return Promise.reject();
            }
          });
      }
    },
    subscribeToChanges() {
      console.log("subscribe");

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
    makeMove(item) {
      const id = item.id;
      if (
        !this.waitingForResponse &&
        this.isHost &&
        item.status !== "closed" &&
        this.activeTeam &&
        this.game.status !== "finished"
      ) {
        this.waitingForResponse = true;
        item.state = this.activeTeam === "1" ? "x" : "o";
        item.status = "closed";
        if (
          this.checkWinner(this.game.gameItems, "x") ||
          this.checkWinner(this.game.gameItems, "o") ||
          !this.game.gameItems.find(gameItem => gameItem.status !== "closed")
        ) {
          this.game.status = "finished";
        }
        this.$store.actions
          .updateGame({
            id: this.game.id,
            gameItems: this.game.gameItems.map(item => {
              return {
                id: item.id,
                content: item.content,
                status: item.status,
                state: item.state
              };
            }),
            status: this.game.status
          })
          .then(({ data: { updateGame } }) => {
            console.log("updateGame", updateGame);
            this.waitingForResponse = false;
            this.activeTeam = this.activeTeam === "1" ? "2" : "1";
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
    async restartGame() {
      let itemsList = [];
      if (this.game.preset === "random") {
        itemsList = await API.get("apid678e88e", `/emoji?count=9`);
      }

      this.game.gameItems = this.shuffleArray(
        this.game.gameItems.map((item, idx) => {
          if (this.game.preset === "random") {
            item.content = itemsList[idx];
          }
          item.status = "new";
          item.state = "new";
          return item;
        })
      );

      this.$store.actions
        .updateGame({
          id: this.game.id,
          gameItems: this.game.gameItems.map(item => {
            return {
              id: item.id,
              content: item.content,
              status: item.status
            };
          }),
          status: "new"
        })
        .then(({ data: { updateGame } }) => {
          console.log("updateGame", updateGame);
          this.waitingForResponse = false;
        });
    }
  }
};
</script>

<style lang="sass" scoped>
$cell-size: 12vmin
$cell-size_sm: 24vmin

.tictactoe-game
  display: grid
  grid-template-rows: 2rem auto
  grid-template-columns: 2rem auto
  text-align: center
  width: fit-content
  &__top
    grid-template-columns: repeat(3, $cell-size)
    @media screen and (max-width: 640px)
      grid-template-columns: repeat(3, $cell-size_sm)
  &__left
    grid-template-rows: repeat(3, $cell-size)
    @media screen and (max-width: 640px)
      grid-template-rows: repeat(3, $cell-size_sm)
  &__wrapper
    grid-template-rows: repeat(3, $cell-size)
    grid-template-columns: repeat(3, $cell-size)
    @media screen and (max-width: 640px)
      grid-template-rows: repeat(3, $cell-size_sm)
      grid-template-columns: repeat(3, $cell-size_sm)
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
      font-size: 12vmin
</style>
