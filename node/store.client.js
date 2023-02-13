import api from './api.client'

export default defineNuxtPlugin((/* nuxtApp */) => {
  return {
    provide: {
      store: () => {
        export const state = () => ({
          jwt: null
        })

        export const mutations = {
          SET_JWT(state, jwt) {
            state.jwt = jwt
          }
        }

        export const actions = {
          async login({ commit }, { username, password }) {
            try {
              const { data } = await api.post('/api/login', { username, password })
              console.log(data)

              if (data.jwt) {
                commit('SET_JWT', data.jwt)
              }
            } catch (error) {
              if (error.response && error.response.status === 401) {
                throw new Error('Bad credentials')
              }
              throw error
            }
          },

          async logout({ commit }) {
            commit('SET_JWT', null)
          }
        }
      }
    }
  }
})
