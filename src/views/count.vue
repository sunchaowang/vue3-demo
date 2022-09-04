<template>
  <div>
    <h1>
      {{ count }}
    </h1>
    <div>
      <button @click="increase">增加</button>
    </div>
  </div>
</template>

<script>
export default {
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
