<template>
  <div>
    <q-page class="text-center">
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs gutter="xs">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el label="Guns Bombs Angels" />
        </q-breadcrumbs>
      </div>

      <h2 class="q-mb-sm">Guns Bombs Angels</h2>
      <h5 class="q-mt-sm">Guns Bombs Angels game</h5>

      <div class="q-gutter-sm">
        <p>Select board size:</p>
        <q-btn color="primary" size="lg" @click="startGame(4)">4×4</q-btn>
        <q-btn color="primary" size="lg" @click="startGame(5)">5×5</q-btn>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  name: "StoryMoji",
  data() {
    return {};
  },
  methods: {
    startGame(size) {
      this.$store.actions
        .createGame({
          ownerID: this.$store.state.userInfo.id,
          type: "gunsbombsangels",
          status: "new",
          size,
          gameTeams: [
            {
              id: 1,
              name: "Team 1",
              score: 5
            },
            {
              id: 2,
              name: "Team 2",
              score: 5
            },
            {
              id: 3,
              name: "Team 3",
              score: 5
            }
          ]
        })
        .then(({ data: { createGame } }) => {
          this.started = true;
          console.log("createGame", createGame);
          this.joinGame(createGame.id);
        });
    },
    joinGame(game_id) {
      if (game_id) {
        this.$router.push(`/gba/${game_id}`);
      }
    }
  }
};
</script>
