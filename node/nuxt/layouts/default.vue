<template>
  <div>
    <v-app>
      <v-main>

        <v-app-bar app>
          <v-row>
            <v-col class="v-col-2"></v-col>
            <v-col class="v-col-8">
              <slot name="header">
                <v-row>
                  <v-col class="v-col-3 text-h6">
                    <NuxtLink to="/">BLOG</NuxtLink>
                  </v-col>
                  <v-col class="v-col-6"></v-col>
                  <v-col v-if="checkAuth" class="v-col-3">
                    <v-row>
                      <v-col>
                        <NuxtLink to="/posts">
                          <v-btn>User Posts</v-btn>
                        </NuxtLink>
                      </v-col>
                      <v-col>
                        <NuxtLink to="/" @click.prevent="logout">
                          <v-btn>Logout</v-btn>
                        </NuxtLink>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col v-else class="v-col-3">
                    <v-row>
                      <v-col></v-col>
                      <v-col>
                        <NuxtLink to="/login">
                          <v-btn>Login</v-btn>
                        </NuxtLink>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </slot>
            </v-col>
            <v-col class="v-col-2"></v-col>
          </v-row>
        </v-app-bar>

        <v-main style="padding-top: 0; padding-bottom: 0">
          <v-container fluid>
            <v-row>
              <v-col class="v-col-2"></v-col>
              <v-col class="v-col-8">
                <slot>
                  <NuxtPage/>
                </slot>
              </v-col>
              <v-col class="v-col-2"></v-col>
            </v-row>
          </v-container>
        </v-main>

        <v-footer app>
          <slot name="footer">
            <v-col class="d-flex justify-center align-center" cols="12">
              <v-icon icon="mdi-copyright" size="x-small" class="d-block mr-1"></v-icon>
              <p class="d-block mr-1">2014 — {{ new Date().getFullYear() }}</p>
              <NuxtLink to="https://github.com/proitcreator" target="_blank" class="d-block">proitcreator</NuxtLink>
            </v-col>
          </slot>
        </v-footer>

      </v-main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: "default",
  computed: {
    checkAuth: () => JwtStore().check
  },
  methods: {
    logout: () => JwtStore().remove()
  }
}
</script>

<style scoped>

</style>
