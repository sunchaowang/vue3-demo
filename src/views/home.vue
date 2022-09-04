<template>
  <div>
    <HellowWorld></HellowWorld>
  </div>
</template>

<script>
import HellowWorld from '../components/HelloWorld';
export default {
  components: {
    HellowWorld,
  },
  data() {
    return {
      count: 0,
    };
  },
  method: {
    increase() {
      this.count++;
    },
  },
};
</script>
