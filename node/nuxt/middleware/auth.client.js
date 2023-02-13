import {JwtStore} from "~/utils/JwtStore.client";

export default defineNuxtRouteMiddleware((to, from) => {
  if ('posts' === to && !JwtStore().check) {
    return navigateTo('/')
  }
})
