<template>
  <v-container fluid fill-height>
    <v-row align-content="center" justify="center">
      <v-col xs="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Signup form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="Name" v-model="name"></v-text-field>
              <v-text-field label="Email" v-model="email"></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                label="Confirm Password"
                type="password"
                v-model="passwordConfirmation"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="primary" @click="signup">Signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/api";
import router from "@/router";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  created() {
    if (this.isLoggedIn) {
      router.push("/");
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["setUser", "setToken"]),

    signup() {
      api
        .post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        })
        .then((res) => {
          this.setUser(res.data.user);
          this.setToken(res.data.token);
        })
        .catch(console.error)
        .finally(() => {
          router.push("/");
        });
    },
  },
};
</script>