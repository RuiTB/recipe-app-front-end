<template>
  <div>
    <v-carousel>
      <v-carousel-item v-for="item in carouselItems" :key="item.id">
        <v-sheet
          height="100%"
          width="100%"
          color="grey lighten-4"
          :style="{
            'background-image': `url(${
              item.photo ||
              'https://hips.hearstapps.com/hmg-prod/images/delish-200114-baked-avocado-boats-0361-landscape-pflo-jpg-1647890967.jpg'
            })`,
            'background-size': 'cover',
            'background-attachment': 'fixed',
            color: 'white',
            'background-color': 'white',
            'text-shadow':
              '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            'background-position': 'center center',
          }"
        >
          <v-row align="center" justify="center" class="fill-height">
            <v-col cols="12" sm="8" md="6">
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <div>
        <v-row class="pa-16">
          <v-col cols="4" v-for="recipe in recipes" :key="recipe.id">
            <v-card>
              <v-img
                :src="
                  recipe.photo
                    ? `http://localhost:8000/storage/${recipe.photo}`
                    : 'https://picsum.photos/100/100'
                "
              ></v-img>
              <v-card-title>{{ recipe.title }}</v-card-title>
              <v-card-text>{{ recipe.description }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :to="`recipes/${recipe.id}`"
                  >Go to</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="fetchRecipes"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      carouselItems: [
        {
          title: "Item 1",
          description: "Description for Item 1",
          image: "https://picsum.photos/1080/1080",
        },
        {
          title: "Item 2",
          description: "Description for Item 2",
          image: "https://picsum.photos/1920/1080",
        },
      ],
      recipes: [],
      currentPage: 1,
      totalPages: 6,
    };
  },
  created() {
    api
      .get("/recipes")
      .then((res) => (this.carouselItems = res.data.data))
      .catch(console.error);
    this.fetchRecipes();
  },
  methods: {
    fetchRecipes() {
      api
        .get(`/recipes?page=${this.currentPage}`)
        .then((response) => {
          this.recipes = response.data.data;
          console.log(response.data.data);
          this.totalPages = response.data.last_page;
        })
        .catch(console.error);
    },
  },
};
</script>
