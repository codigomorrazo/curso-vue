<template>
  <h2>{{ title }}</h2>
  <p data-testid="counter">{{ counter }}</p>
  <p> {{ counter }} <sup>2</sup>= {{ squareCounter }}</p>
  <div>
    <button @click="increase">+1</button>
    <button @click="decrease">-1</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    title: {
      type: String,
      default: 'Counter',
      validator: (value) => {
        let length = value.length;
        return 4 < length && length < 15;
      }
    },
    contador: {
      type: Number,
      default: 100,
      validator: (value) => {
        return value > 10;
      }
    }
  },
  data() {
    return {
      counter: this.contador,
    }
  },
  methods: {
    getSquareValue() {
      return this.counter * this.counter;
    },
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    }
  },
  computed: {
    squareCounter() {
      return this.counter * this.counter;
    }
  }
}
</script>

<style scoped>
button {
  background-color: #64db87;
  border-radius: 4px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}
</style>