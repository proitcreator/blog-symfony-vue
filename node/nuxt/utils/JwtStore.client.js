import {defineStore} from 'pinia'

export const JwtStore = defineStore({
  id: 'jwt',

  state: () => ({
    value: localStorage.getItem('jwt')
  }),

  getters: {
    check: state => !!state.value
  },

  actions: {
    set(jwt) {
      return new Promise((resolve, reject) => {
        localStorage.setItem('jwt', jwt)
        this.value = jwt
        resolve()
      })
    },
    remove() {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('jwt')
        this.value = null
        resolve()
      })
    }
  }
})
