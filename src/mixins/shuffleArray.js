const shuffleArray = {
  methods: {
    shuffleArray(items) {
      const arr = [...items];

      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      console.log(arr);

      return arr
    }
  }
};

export default shuffleArray
