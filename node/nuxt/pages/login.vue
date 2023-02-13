<template>
  <v-row>
    <v-col class="v-col-3"></v-col>
    <v-col class="v-col-6">
      <v-card>
        <v-card-text>
          <v-form ref="loginForm" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="username" :rules="[rules.required]" label="Login" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" name="input-10-1"
                              label="Password" hint="At least 3 characters" counter
                              @click:append="show = !show"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                <v-btn x-large block :disabled="!valid" color="success" @click="login"> Login</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col class="v-col-3"></v-col>
  </v-row>
</template>

<script>

export default {
  name: "login",
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  data: () => ({
    valid: true,
    password: "",
    verify: "",
    username: "",

    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    show: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 3) || "Min 8 characters"
    }
  }),
  methods: {
    async login() {
      if (!this.$refs.loginForm.validate()) {
        return false
      }
      this.$api.post('/auth', {username: this.username, password: this.password}).then(resp => {
        if (resp.data.token) {
          return JwtStore().set(resp.data.token).then(() => navigateTo('/posts'))
        }
        alert('Authorization fail')
      }).catch(err => {
        alert(err)
      })
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>

</style>
