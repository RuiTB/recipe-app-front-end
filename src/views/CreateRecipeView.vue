<template>
  <v-container fluid fill-height>
    <v-row align-content="center" justify="center">
      <v-col xs="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Recipe Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form enctype="multipart/form-data">
              <v-text-field label="Title" v-model="title"></v-text-field>
              <v-text-field
                label="Description"
                v-model="description"
              ></v-text-field>
              <v-text-field
                label="Steps"
                type="number"
                v-model="steps"
              ></v-text-field>
              <v-text-field
                label="Time(s)"
                type="number"
                v-model="time"
              ></v-text-field>
              <v-text-field label="Size" v-model="size"></v-text-field>
              <v-file-input
                label="Photo"
                :value="photo"
                accept="image/*"
                @change="handlePhotoChange"
              ></v-file-input>

              <v-combobox
                v-model="ingredientsInput"
                :items="ingredients"
                item-text="name"
                item-value="id"
                multiple
                label="Ingredients"
              ></v-combobox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submitRecipe">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/api";
import router from "@/router";
export default {
  data() {
    return {
      title: "",
      description: "",
      steps: 0,
      time: 0,
      size: "",
      photo: null,
      ingredientsInput: [],
      ingredients: [],
    };
  },
  created() {
    api
      .get("/ingredients")
      .then((res) => (this.ingredients = res.data))
      .catch(console.error);
  },

  methods: {
    submitRecipe() {
      const formData = new FormData();

      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("steps", parseInt(this.steps, 10));
      formData.append("time", parseInt(this.time, 10));
      formData.append("size", this.size);
      formData.append("photo", this.photo);
      this.ingredientsInput.forEach((item) =>
        formData.append("ingredients[]", item.id)
      );

      api
        .post("/recipes", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
          router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handlePhotoChange(file) {
      this.photo = file;
    },
  },
};
</script>
