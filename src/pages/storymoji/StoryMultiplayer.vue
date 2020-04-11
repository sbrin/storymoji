<template>
  <div>
    <q-page class="flex flex-center content-center" padding>
      <DicePlayer
        v-for="(item, idx) in Array(players)"
        :key="idx"
        :number="number"
        :index="idx"
        @removePlayer="removePlayer(idx)"
      ></DicePlayer>
      <!-- </template> -->
    </q-page>
    <q-footer elevated class="bg-grey-2 flex flex-center">
      <q-toolbar>
        <q-btn
          color="orange"
          flat
          size="lg"
          @click="players -= 1"
          :disable="players <= 1"
        >Remove player</q-btn>

        <q-space />

        <q-toolbar-title class="text-black">
          <q-btn color="orange" flat @click="number -= 1" :disable="number <= 1">-</q-btn>
          Dices: {{ number }}
          <q-btn color="blue" flat @click="number += 1" :disable="number >= 9">+</q-btn>
        </q-toolbar-title>

        <q-space />

        <q-btn color="blue" flat size="lg" @click="players += 1">Add player</q-btn>
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
      started: true,
      players: 1,
      number: 5
    };
  },
  methods: {
    removePlayer(idx) {
      this.players -= 1;
    }
  }
};
</script>
