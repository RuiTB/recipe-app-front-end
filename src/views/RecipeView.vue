<template>
  <v-container>
    <v-card>
      <v-img
        :src="recipe.photo || 'https://picsum.photos/200/300'"
        height="300px"
      ></v-img>
      <v-card-title>{{ recipe.title }}</v-card-title>
      <v-card-text>
        <div>Description: {{ recipe.description }}</div>
        <div>Steps: {{ recipe.steps }}</div>
        <div>Time: {{ recipe.time }}</div>
        <div>Size: {{ recipe.size }}</div>
        <v-list>
          <v-chip
            class="mx-3"
            v-for="ingredient in recipe.ingredients"
            :key="ingredient.id"
            >{{ ingredient.name }}</v-chip
          >
        </v-list>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Add a Comment:</v-card-title>
      <v-card-text>
        <v-textarea v-model="newComment" label="Your Comment"></v-textarea>
        <v-btn color="primary" @click="addComment">Post Comment</v-btn>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Comments:</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="comment in recipe.comments" :key="comment.id">
            <v-list-item-content>
              <!-- <v-list-item-title>{{
                getAuther(comment.user_id)
              }}</v-list-item-title> -->
              <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      recipe: null,
      newComment: "",
      id: 0,
    };
  },
  mounted() {
    this.id = this.$route.params.id;

    api
      .get(`/recipes/${this.id}`)
      .then((response) => {
        this.recipe = response.data;
      })
      .catch(console.error);
  },
  methods: {
    addComment() {
      api
        .post(`/recipes/${this.id}/comments`, {
          content: this.newComment,
        })
        .then(console.log)
        .catch(console.error);
    },
    // getAuther(id) {

    // },
  },
};
</script>
