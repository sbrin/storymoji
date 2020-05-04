<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Guns Bombs Angels" to="/gba" />
        <q-breadcrumbs-el label="Game" />
      </q-breadcrumbs>
    </div>

    <template>
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
              v-for="(item, idx) in ['A', 'B', 'C', 'D', 'E'].slice(
                0,
                game.size
              )"
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
        <div class="col-sm-12 col-md-2 q-ma-md">
          <div class="row flex-center q-gutter-md">
            <q-card
              class="text-subtitle1 col-sm-3 col-md-12"
              v-for="team in game.gameTeams"
              :key="team.id"
            >
              <div class="row items-center justify-between no-wrap q-pl-md">
                <div class="col-auto">{{ team.name }}</div>
                <div class="col-auto">
                  <q-btn
                    color="grey-7"
                    round
                    flat
                    icon="more_vert"
                    v-if="isHost"
                  >
                    <q-menu cover auto-close>
                      <q-list>
                        <q-item clickable>
                          <q-item-section @click="$emit('changeName')"
                            >Change name</q-item-section
                          >
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
              <q-card-section>
                <div class="text-h5">
                  <span v-for="(score, idx) in team.score" :key="idx">❤️</span>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="flex flex-center q-pa-md" v-show="!started">
            <q-btn
              color="primary"
              size="lg"
              label="Add team"
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
          <q-btn color="blue" flat size="lg" @click="startGame"
            >Start game</q-btn
          >
        </q-toolbar>
      </q-footer>
    </template>
  </q-page>
</template>

<script>
export default {
  name: "GbaGame",
  components: {},
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      game: {
        gameTeams: []
      },
      items: []
    };
  },
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
    }
  },
  watch: {
    "$route.params.id": {
      handler: function(a, b) {
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
        }
        this.subsctibeToChanges();
      })
      .catch(e => {
        console.log(e);

        this.$router.push("/gba");
      });
  },
  methods: {
    getGame() {
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
    },
    startGame() {
      this.$store.actions
        .updateGame({
          id: this.game.id,
          status: "started",
          gameItems: this.items
        })
        .then(({ data: { updateGame } }) => {
          this.game.status = "started";
          console.log("updateGame", updateGame);
        });
    },
    subsctibeToChanges() {
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
        });
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

      for (let i = this.items.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        // same can be written as:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
      }
      this.items = this.items.map((item, idx) => ({
        id: idx,
        content: item,
        status: "closed"
      }));
      this.game.gameItems = this.items;
      console.log(this.items);
    },
    openCell(id) {
      if (!this.waitingForResponse && this.started) {
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
      if (!this.waitingForResponse && this.started) {
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
    addTeam() {
      this.game.gameTeams.push({
        id: this.game.gameTeams.length + 1,
        name: `Team ${this.game.gameTeams.length + 1}`,
        score: 5
      });
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
