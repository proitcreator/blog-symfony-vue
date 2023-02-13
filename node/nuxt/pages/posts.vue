<template>
  <v-row>
    <v-col>POSTS</v-col>
    <v-col class="v-col-2">
    </v-col>
  </v-row>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        ID
      </th>
      <th class="text-left">
        OWNER
      </th>
      <th class="text-left">
        TEXT
      </th>
      <th class="text-left">
        <v-dialog v-model="dialogCreatePost" width="1000">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" icon="mdi-plus"></v-btn>
          </template>
          <v-form ref="postForm" v-model="valid" lazy-validation>
            <v-card>
              <v-card-text>
                <v-text-field v-model="text" :rules="[rules.required]" label="Text" required></v-text-field>
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-row>
                  <v-col>
                    <v-btn x-large block :disabled="!valid && !text" color="success" @click="submitPost">Create Post
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block @click="dialogCreatePost = false" color="primary">Close</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="v in posts">
      <td>{{ v.id }}</td>
      <td>{{ v.owner }}</td>
      <td>{{ v.text }}</td>
      <td class="v-col-1">
        <v-btn color="pink" icon="mdi-minus" @click="deletePost(v.id)"></v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: 'posts',
  data: () => ({
    posts: [],
    valid: true,
    text: '',
    dialogCreatePost: false,
    rules: {
      required: value => !!value || 'Required.'
    }
  }),
  created() {
    if (JwtStore().check) {
      this.setPosts()
    } else {
      navigateTo('/')
    }
  },
  methods: {
    async setPosts() {
      await this.$api.get('/api/posts').then(resp => {
        if (0 < resp.data['hydra:member'].length) {
          this.posts = resp.data['hydra:member']
        }
      }).catch(err => {
        console.log(err)

        if (err.response.status === 401) {
          navigateTo('/login')
        } else {
          alert(err)
        }
      })
    },
    submitPost() {
      if (!this.$refs.postForm.validate()) {
        return false
      }
      this.$api.post('/api/posts', {text: this.text}).then(resp => new Promise((resolve, reject) => {
        if (!resp.data.id) {
          return reject('Error saving')
        }
        this.dialogCreatePost = false
        this.text = ''
        this.setPosts()
      })).catch(err => {
        alert(err)
      })
    },
    deletePost(id) {
      if (!id) {
        return false
      }
      this.$api.delete(`/api/posts/${id}`).then(resp => new Promise((resolve, reject) => {
        this.setPosts()

        if (resp.status !== 204) {
          return reject('Deletion error')
        }
      })).catch(err => {
        this.setPosts()
        alert(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
