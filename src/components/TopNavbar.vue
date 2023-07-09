<template>
  <div>
    <v-app-bar height="86">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title
        style="cursor: pointer"
        @click="$router.push('/')"
        class="text-h4 mr-6"
      >
        Foodify
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn text>Recipes</v-btn>
        <v-btn text>Authers</v-btn>
        <v-btn text>About us</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text><v-icon left>mdi-magnify</v-icon>Search</v-btn>
        <template v-if="isLoggedIn">
          <v-btn text><v-icon>mdi-bookmark-outline</v-icon>Bookmark</v-btn>
          <v-btn text to="recipe-form">
            <v-icon left>mdi-newspaper-plus</v-icon> New Rcipe
          </v-btn>
          <v-list-item class="green--text">{{ getUser.name }}</v-list-item>
        </template>
        <template v-if="!isLoggedIn">
          <v-btn text to="login">Login</v-btn>
          <v-btn text to="signup">Sign up</v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>
    <!-- <v-navigation-drawer absolute temporary v-model="drawer">
      <v-list>
        <v-list-item>

        </v-list-item>
    </v-list>
    </v-navigation-drawer> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getUser", "isLoggedIn"]),
  },
};
</script>

<style></style>