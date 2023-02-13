import _axios from "axios"
import {defineNuxtPlugin} from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const axios = _axios.create({
    baseURL: 'http://localhost:8000'
  })
  axios.interceptors.request.use(
    async config => {
      config.headers = {'Authorization': `Bearer ${JwtStore().value}`}

      return config
    },
    error => {
      Promise.reject(error)
    })

  return {
    provide: {
      api: axios
    }
  }
})
