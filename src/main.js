import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Raven
  .config('https://1dfc5e63808b41058675b4b3aed4cfb6@sentry.io/1298044')
  .addPlugin(RavenVue, Vue)
  .install()

Vue.config.errorHandler = function (err, vm, info) {
  Raven.captureException(err)
}

const request = axios.create()
request.interceptors.response.use(response => {
  return response
})

Vue.request = (args) => {
  return new Promise((resolve, reject) => {
    request(args).then(res => {
      resolve(res)
    }).catch(err => {
      Raven.captureException(err)
      reject(err)
    })
  })
}

Vue.mixin({
  beforeCreate: function () {
    const methods = this.$options.methods || {}
    Object.entries(methods).forEach(([key, method]) => {
      if (method._asyncWrapped) return
      const wrappedMethod = function (...args) {
        const result = method.apply(this, args)
        const resultIsPromise = result && typeof result.then === 'function'
        if (!resultIsPromise) return result

        return new Promise(async (resolve, reject) => {
          try {
            resolve(await result)
          } catch (error) {
            if (!error._handled) {
              const errorHandler = Vue.config.errorHandler
              errorHandler(error)
              error._handled = true
            }
            reject(error)
          }
        })
      }
      wrappedMethod._asyncWrapped = true
      methods[key] = wrappedMethod
    })
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
  // renderError () {
  //   console.log('renderError')
  // }
  // // errorCaptured () {
  // //   console.log('errorCaptured')
  // // }
}).$mount('#app')

/*
0: TypeError: Cannot read property 'info' of undefined at VueComponent.normal …
1: VueComponent {_uid: 1, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
2: "created hook
*/
