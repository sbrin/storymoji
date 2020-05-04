<template>
  <q-page>
    <q-page>
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs gutter="xs">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el label="Storymoji" to="/storymoji" />
          <q-breadcrumbs-el label="Solo" />
        </q-breadcrumbs>
      </div>

      <div class="text-center" v-if="!started">
        <h2 class="q-mb-sm">StoryMoji</h2>
        <h4 class="q-mt-sm">Solo</h4>

        <div class="q-pb-md flex column content-center flex-center">
          <div class="q-gutter-md" style="min-width: 300px">
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
                  :value="size"
                  @change="
                    val => {
                      size = val;
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

        <q-btn color="primary" size="lg" @click="started = true">Start</q-btn>
      </div>

      <template v-if="started">
        <div class="flex flex-center content-center fit">
          <StoryPlayer
            v-for="(item, idx) in Array(players)"
            :key="idx + run_id"
            :number="size"
            :index="idx"
            :isHost="isHost"
            @removePlayer="removePlayer(idx)"
          ></StoryPlayer>
        </div>

        <q-footer bordered class="bg-grey-2 flex flex-center">
          <q-toolbar class="flex flex-center">
            <q-btn color="blue" flat size="lg" @click="started = 0"
              >New game</q-btn
            >
          </q-toolbar>
        </q-footer>
      </template>
    </q-page>
  </q-page>
</template>

<script>
import StoryPlayer from "./StoryPlayer.vue";

export default {
  name: "PageIndex",
  components: {
    StoryPlayer
  },
  data() {
    return {
      run_id: 0,
      started: false,
      players: 3,
      size: 3,
      isHost: true
    };
  },
  methods: {
    removePlayer(idx) {
      this.players -= 1;
    }
  }
};
</script>
