<template>
  <q-card flat bordered class="flex dice-wrapper q-ma-md">
    <!-- <q-btn color="grey-4" flat round icon="fas fa-dice" ></q-btn>
    <q-btn color="grey-2" text-color="black" round flat :disable="true">{{ index + 1 }}</q-btn>-->
    <q-btn color="grey-7" round flat icon="more_vert" class="dice-wrapper__button">
      <q-menu cover auto-close>
        <q-list>
          <!-- <q-item clickable>
            <q-item-section @click="$emit('removePlayer')">Remove player</q-item-section>
          </q-item>-->
          <q-item clickable>
            <q-item-section @click="rollTheDice">Roll the dice</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-separator dark />

    <q-card-section class="flex align-center justify-center text-center">
      <EssentialDice
        v-for="(dice, idx) in dice_set"
        :key="idx + cid"
        :data="dice"
        @replaceDice="replaceDice(idx)"
      ></EssentialDice>
    </q-card-section>
  </q-card>
</template>

<script>
import EssentialDice from "@/components/EssentialDice.vue";
import emojis from "@/assets/emoji.json";

let EMOJIS = [...emojis];
let EMOJIS_USED = [];

export default {
  name: "DiceWrapper",
  components: {
    EssentialDice
  },
  props: {
    number: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      started: false,
      cid: 0,
      dice_set: []
    };
  },
  watch: {
    number(after, before) {
      if (after > before) {
        this.getNewDice();
      }
      if (after < before) {
        this.removeDice();
      }
    }
  },
  created() {
    this.rollTheDice();
  },
  methods: {
    rollTheDice() {
      if (EMOJIS.length < this.number) {
        EMOJIS = [...EMOJIS, ...EMOJIS_USED];
        EMOJIS_USED = [];
      }
      this.dice_set = [];

      for (let i = 0; i < this.number; i++) {
        this.getNewDice();
      }
    },
    getNewDice(skip) {
      let index = Math.floor(Math.random() * EMOJIS.length);
      let dice = EMOJIS[index];

      EMOJIS_USED.push(EMOJIS[index]);
      EMOJIS.splice(index, 1);
      if (!skip) {
        this.dice_set.push(dice.char);
      }
      return dice.char;
    },
    removeDice() {
      this.dice_set.pop();
    },
    replaceDice(index) {
      if (index >= 0) {
        this.dice_set = this.dice_set.map((item, idx) => {
          if (idx === index) {
            return this.getNewDice(true);
          }
          return item;
        });
      } else {
        this.dice_set.pop();
      }
    },
    addDice() {
      this.getNewDice();
    }
  }
};
</script>
<style lang="scss">
.dice-wrapper {
  position: relative;
  max-width: 400px;
  &__button {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
  }
  &__number {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 10;
  }
}
</style>
