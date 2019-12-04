<template>
  <div class="login">

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.loading = true
      this.handleLogin({ userName, password }).then(res => {
        this.$router.push({
          path: '/home'
        })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
