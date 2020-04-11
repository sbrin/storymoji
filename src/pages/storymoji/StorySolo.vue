<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Storymoji" to="/storymoji/" />
        <q-breadcrumbs-el label="Solo" />
      </q-breadcrumbs>
    </div>

    <q-page v-if="!started" class="flex column content-center" padding>
      <h2>StoryMoji Solo</h2>
      <div class="q-pb-md">
        <div class="q-gutter-md" style="min-width: 320px">
          <q-field label="Players" stack-label>
            <template v-slot:control>
              <q-slider
                :value="players"
                @change="val => { players = val }"
                :min="0"
                :max="12"
                label
                label-always
                class="q-mt-lg"
              />
            </template>
          </q-field>
          <q-field label="Cards" stack-label>
            <template v-slot:control>
              <q-slider
                :value="dice"
                @change="val => { dice = val }"
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

      <q-btn color="primary" size="lg" @click="started = true">Start game</q-btn>
    </q-page>

    <q-page v-if="started" class="flex flex-center content-center" padding>
      <DicePlayer
        v-for="(item, idx) in Array(players)"
        :key="idx + run_id"
        :number="dice"
        :index="idx"
        @removePlayer="removePlayer(idx)"
      ></DicePlayer>
      <!-- </template> -->
    </q-page>
    <q-footer elevated class="bg-grey-2 flex flex-center">
      <q-toolbar class="flex flex-center">
        <q-btn color="blue" flat size="lg" @click="started = 0">New game</q-btn>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script>
import DicePlayer from "@/components/DicePlayer.vue";

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
      dice: 3
    };
  },
  methods: {
    removePlayer(idx) {
      this.players -= 1;
    }
  }
};
</script>
