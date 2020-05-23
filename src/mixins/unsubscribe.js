export default {
  data() {
    return {
      unsubscribe: []
    }
  },
  beforeDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe());
  },
};
