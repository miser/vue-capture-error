<template>
  <div id="app">
    <!-- {{ data.info.data }} -->
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input type="button" @click="click" value="click" />
  </div>
</template>

<script>
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data () {
    return {
      data: null
    }
  },
  components: {
    HelloWorld
  },
  created () {
    // this.normal()
    // this.fetch1()
    // this.fetch2()
    // this.fetch3()
    // this.fetch4()
    this.fetch5()
  },
  methods: {
    normal () {
      let data
      let info = data.info
    },
    fetch1 () {
      Vue.request('https://api1.github.com/')
        .then(response => {
          console.log(response)
        })
    },
    fetch2 () {
      Vue.request('https://api.github.com/')
        .then(response => {
          let data = response.data
          let info = data.api.fetch2
        })
    },
    fetch3 () {
      return Vue.request('https://api.github.com/')
        .then(response => {
          let data = response.data
          let info = data.api.fetch3
        })
    },

    async fetch4 () {
      let response = await Vue.request('https://api.github.com/')
      let data = response.data
      let info = data.api.fetch4
    },
    async fetch5 () {
      let response = await Vue.request('https://api.github.com/')
      let data = response.data
      let info = data.api.fetch5
      return response
    },
    click () {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}
</style>
