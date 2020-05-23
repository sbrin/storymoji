<template>
  <q-card class="text-subtitle1 col-xs-12 col-sm-3 col-md-8 col-lg-4">
    <div class="row items-center justify-between no-wrap q-pl-md">
      <div class="col-auto">{{ team.name }}</div>
      <div class="col-auto">
        <q-btn color="grey-7" round flat icon="more_vert" v-if="isHost">
          <q-menu cover auto-close>
            <q-list>
              <q-item clickable>
                <q-item-section @click="$emit('changeName')">Change name</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section @click="$emit('removeTeam')">Remove</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <q-card-section class="text-center">
      <div class="text-h1" v-show="team.score === 0">😵</div>
      <div class="text-h1 q-mb-sm" v-show="winner">🥳</div>
      <div class="text-h5" v-show="team.score > 0">
        <span v-for="(score, idx) in team.score" :key="idx">❤️</span>
      </div>
    </q-card-section>
    <q-card-actions align="around" v-show="isHost && team.score > 0 && !winner">
      <q-btn flat :disabled="waitingForResponse || team.score === 0" @click="$emit('scoreDown')">—💔</q-btn>
      <q-btn flat :disabled="waitingForResponse" @click="$emit('scoreUp')">+❤️</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "GbaTeam",
  props: {
    team: {
      type: Object,
      default: () => ({})
    },
    isHost: {
      type: Boolean,
      default: false
    },
    waitingForResponse: {
      type: Boolean,
      default: false
    },
    winner: {
      type: Boolean,
      default: false
    }
  }
};
</script>
