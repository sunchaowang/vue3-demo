<template>
  <div id="app">
    <button @click="getUserInfo" >Axios</button>
    count: {{count}}
    <router-view />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import { ref, onMounted, computed, reactive } from 'vue';
import { effect } from '@vue/reactivity';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    let count = ref(1);

    const countComputed = computed(() => {
      return count.value + 2;
    })
    effect(() => {
      console.log('effect ... ', countComputed.value + count.value);
    });

    window.performance.mark("own")

    onMounted(() => {
      console.log('onMounted');
      count.value = count.value+1;
      window.performance.mark("own")
    });

    const http = axios.create();
    const requestMap = new Map();
    const source = axios.CancelToken.source();

    http.interceptors.request.use((config) => {
      console.log("requestMap", requestMap.get("key"))
      if (requestMap.has("key")) {
        const cancelToken = requestMap.get("key");
        console.log("cancelToken")
        cancelToken("cancel");
      }
      config.cancelToken = config.cancelToken || new axios.CancelToken((c) => {
        requestMap.set("key", c);
      })
      
      
      return config;
    })

    http.interceptors.response.use((response) => {
      requestMap.delete("key")
      return response;
    })

    function getUserInfo() {
      const _promise = [
        new Promise((resolve, reject) => {
          console.log("promise 1")
          resolve(1)
        }),
        new Promise((resolve, reject) => {
          console.log("promise 2")
          reject(2)
        }),
        new Promise((resolve, reject) => {
          console.log("promise 3")
          resolve(3)
        }),
      ]

      Promise.race(_promise).then(res => {
        console.log("promise then  ... ", res)
      }).catch(e => {
        console.log("promise catch  ... ", e)
      })
    }

    function inCreme() {
      count.value++;
    }

    return {
      getUserInfo,
      inCreme,
      count
    }
  },
  data() {
    return {
      name: '12',
    };
  },
  // beforeCreate: function () {
  //   console.group('beforeCreate ???????????????===============???');
  //   console.log('%c%s', 'color:red', 'el     : ', this.$el); //undefined
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data); //undefined
  //   console.log('%c%s', 'color:red', 'message: ' + this.message);
  //   this.$nextTick(() => {
  //     console.log("nextTick", window.document.querySelector("#app"))
  //   })
  // },
  // created: function () {
  //   console.group('created ??????????????????===============???');
  //   console.log('%c%s', 'color:red', 'el     : ' + this.$el); //undefined
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data); //???????????????
  //   console.log('%c%s', 'color:red', 'message: ' + this.message); //???????????????
  // },
  // beforeMount: function () {
  //   console.group('beforeMount ???????????????===============???');
  //   console.log('%c%s', 'color:red', 'el     : ' + this.$el); //???????????????
  //   console.log(this.$el);
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data); //???????????????
  //   console.log('%c%s', 'color:red', 'message: ' + this.message); //???????????????
  // },
  // mounted: function () {
  //   console.group('mounted ??????????????????===============???');
  //   console.log('%c%s', 'color:red', 'el     : ' + this.$el); //???????????????
  //   console.log(this.$el);
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data); //???????????????
  //   console.log('%c%s', 'color:red', 'message: ' + this.message); //???????????????
  // },
  // beforeUpdate: function () {
  //   console.group('beforeUpdate ???????????????===============???');
  //   console.log('%c%s', 'color:red', 'el     : ' + this.$el);
  //   console.log(this.$el);
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data);
  //   console.log('%c%s', 'color:red', 'message: ' + this.message);
  // },
  // updated: function () {
  //   console.group('updated ??????????????????===============???');
  //   console.log('%c%s', 'color:red', 'el     : ' + this.$el);
  //   console.log(this.$el);
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data);
  //   console.log('%c%s', 'color:red', 'message: ' + this.message);
  // },
  // beforeDestroy: function () {
  //   console.group('beforeDestroy ???????????????===============???');
  //   console.log('%c%s', 'color:red', 'el     : ' + this.$el);
  //   console.log(this.$el);
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data);
  //   console.log('%c%s', 'color:red', 'message: ' + this.message);
  // },
  // destroyed: function () {
  //   console.group('destroyed ??????????????????===============???');
  //   console.log('%c%s', 'color:red', 'el     : ' + this.$el);
  //   console.log(this.$el);
  //   console.log('%c%s', 'color:red', 'data   : ' + this.$data);
  //   console.log('%c%s', 'color:red', 'message: ' + this.message);
  // },
};
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
