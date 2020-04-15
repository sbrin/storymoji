<template>
  <q-page>
    <q-page class="text-center">
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs gutter="xs">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el label="Storymoji" to="/storymoji" />
          <q-breadcrumbs-el label="Multiplayer" />
        </q-breadcrumbs>
      </div>

      <template v-if="!started">
        <h2 class="q-mb-sm">StoryMoji</h2>
        <h4 class="q-mt-sm">Multiplayer</h4>

        <amplify-sign-in v-if="!state.isAuthorized" :signInConfig="{ username: 'username' }"></amplify-sign-in>

        <div class="q-pb-md flex column content-center">
          <div class="q-gutter-md" style="min-width: 320px">
            <q-field label="Players" filled stack-label>
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
            </q-field>
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
        <div class="q-gutter-md">
          <q-btn color="primary" size="lg" @click="started = true">Start a new game</q-btn>
          <div class="text-body1">or</div>
          <q-btn flat dense color="primary" label="Join existing one" class="q-mt-sm" />
        </div>
      </template>

      <template v-if="started">
        <div class="flex flex-center content-center fit">
          <DicePlayer
            v-for="(item, idx) in Array(players)"
            :key="idx + run_id"
            :number="dice"
            :index="idx"
            @removePlayer="removePlayer(idx)"
          ></DicePlayer>
        </div>

        <q-footer bordered class="bg-grey-2 flex flex-center">
          <q-toolbar class="flex flex-center">
            <q-btn color="blue" flat size="lg" @click="startMultiplayer">New game</q-btn>
          </q-toolbar>
        </q-footer>
      </template>
    </q-page>
  </q-page>
</template>

<script>
import DicePlayer from "@/components/DicePlayer.vue";
import state from "@/store/";

export default {
  name: "PageIndex",
  components: {
    DicePlayer
  },
  data() {
    return {
      run_id: 0,
      started: false,
      players: 3,
      dice: 3,
      state: state
    };
  },
  methods: {
    removePlayer(idx) {
      this.players -= 1;
    },
    startMultiplayer() {}
  }
};
</script>
