<template>
  <Counter contador="1" title="Entran"/>
  <Indecision/>
</template>

<script>

import Indecision from './components/Indecision';
import Counter from './components/Counter';

export default {
  name: 'App',
  components: {
    Indecision,
    Counter,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
