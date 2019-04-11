<template>
  <v-app>
    <Header />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'app',
  components: {
    Header
  },
  data () {
    return {
      //
    }
  }
}
</script>
