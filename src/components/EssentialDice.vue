<template>
  <div
    class="q-ma-sm dice-face flex align-center justify-center column"
    @click="$emit('replaceDice')"
  >
    {{ data }}
  </div>
</template>

<script>
export default {
  name: "EssentialLink",
  props: {
    data: {
      type: String,
      required: true
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.dice-face {
  background-image: radial-gradient(white, $warning);
  width: 100px;
  height: 100px;
  border-radius: 10px;
  font-size: 60px;
  box-sizing: border-box;
}
</style>
