<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Storymoji" to="/storymoji" />
        <q-breadcrumbs-el label="Multiplayer" />
      </q-breadcrumbs>
    </div>

    <template>
      <div class="text-center">
        <h2 class="q-mb-sm">StoryMoji</h2>
        <h4 class="q-mt-sm">Multiplayer</h4>
      </div>

      <div class="q-pb-md flex column content-center">
        <div class="q-gutter-md" style="min-width: 320px">
          <!-- <q-field label="Players" filled stack-label>
              <template v-slot:control>
                <q-slider
                  :value="players"
                  @change="
                    val => {
                      players = val;
                    }
                  "
                  :min="0"
                  :max="12"
                  label
                  label-always
                  class="q-mt-lg"
                />
              </template>
          </q-field>-->
          <q-field label="Cards" filled stack-label>
            <template v-slot:control>
              <q-slider
                :value="dice"
                @change="
                  val => {
                    dice = val;
                  }
                "
                :min="0"
                :max="9"
                label
                label-always
                class="q-mt-lg"
              />
            </template>
          </q-field>
        </div>
      </div>
      <div class="q-gutter-md text-center">
        <q-btn color="primary" size="lg" @click="startMultiplayer"
          >Start a new game</q-btn
        >
        <div class="text-body1">or</div>
        <q-btn
          flat
          dense
          color="primary"
          label="Join existing one"
          class="q-mt-sm"
          @click.prevent="prompt = true"
        />
      </div>
    </template>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter Room ID</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="game_id" autofocus required />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Join" v-close-popup @click="joinGame(game_id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "StoryMultiplayer",
  components: {},
  data() {
    return {
      run_id: 0,
      started: false,
      players: 3,
      dice: 3,
      prompt: false,
      game_id: ""
    };
  },
  methods: {
    removePlayer(idx) {
      this.players -= 1;
    },
    startMultiplayer() {
      this.$store.actions
        .createGame({
          ownerID: this.$store.state.userInfo.id,
          type: "storycards",
          dice: this.dice
        })
        .then(({ data: { createGame } }) => {
          this.started = true;
          console.log("createGame", createGame);
          this.joinGame(createGame.id);
        });
    },
    joinGame(game_id) {
      if (game_id) {
        this.$router.push(`/storymoji/multi/${game_id}`);
      }
    }
  }
};
</script>
