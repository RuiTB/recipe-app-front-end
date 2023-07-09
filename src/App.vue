<template>
  <v-app>
    <top-navbar></top-navbar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TopNavbar from "./components/TopNavbar.vue";
export default {
  name: "App",

  components: { TopNavbar },
  data() {
    return {};
  },
  computed: {},
  beforeCreate() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.$store.commit("setUser", user);
    }
  },
};
</script>
