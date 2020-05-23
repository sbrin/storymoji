<template>
  <q-page class="text-center" padding>
    <p>Hello</p>

    <p>
      <q-btn color="primary" size="lg" to="/storymoji">Storymoji</q-btn>
    </p>
    <p>
      <q-btn color="primary" size="lg" to="/gba">Guns Bombs Angels</q-btn>
    </p>
    <p>
      <q-btn color="primary" size="lg" to="/tictactoe">Tic Tac Emoji</q-btn>
    </p>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
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
