<template>
  <div id="app">
    <NavBar v-bind:recipes="recipes" @searchWord="searchFilter" :passedToken="token" @check-token="checkToken"/>
    <router-view v-bind:recipes="recipes" @delete-recipe="deleteSingleRecipe" 
                 @add-new-recipe="addNewRecipe" @submit-edit="updateExistingRecipe" 
                 :alertSuccess="alertSuccess" @sort-by-category="filterByCategory" @remove-category="removeFilterByCategory">
    
    </router-view>
    
  </div>
</template>

<script>

import NavBar from './components/NavigationBar.vue';
import Recipes from './components/Recipes.vue';
import AddRecipe from './components/AddRecipe.vue';

import axios from 'axios';

/* eslint-disable */

export default {
  name: 'app',
  components: {
    NavBar,
    Recipes,
    AddRecipe

  }, 
  data() {
    return {
      alertSuccess: false,
      token: localStorage.getItem('token'),
      search: '',
      recipes: []
    }
  },
  methods: {
    

    deleteSingleRecipe(id){
      axios.delete(`http://localhost:3000/api/recipes/${id}?access_token=${this.token}`)
            .then(res => this.recipes = this.recipes.filter(recipe => recipe.id !== id))
            .catch(err => console.log(err));

      this.alertSuccess = true;
    },
    addNewRecipe(newRecipe){
      let newRec = {
        name: newRecipe.name,
        description: newRecipe.description,
        ingredients: ["1","3","5"],
        category: newRecipe.category,
        photo: newRecipe.photo,
        photoName: newRecipe.photoName
      }

      // console.log(newRec);

      // axios.post('http://localhost:3000/api/recipes', newRec)
      // .then(res => this.recipes = [...this.recipes, res.data])
      // .catch(err => console.log(err));

      axios.post('http://localhost:3000/api/recipes?access_token=' + this.token, newRec)
      .then(res => this.recipes = [...this.recipes, res.data])
      .catch(err => console.log(err));

      axios.post('http://localhost:3000/api/containers/photos/upload?access_token=' + this.token, newRec.photo)
      .then((res) => console.log(res.data.result.files.image[0].name))
      .catch((err) => console.log(err));


      

      // this.recipes.push(newRec);
    },

    updateExistingRecipe(updatedRecipe){
      if(updatedRecipe[0].photoName != null && updatedRecipe[1].photo != updatedRecipe[1].photo &&updatedRecipe[1].photoName != updatedRecipe[1].photoName){
        axios.post('http://localhost:3000/api/containers/photos/upload?access_token=' + this.token, updatedRecipe[0].photo)
             .then((res) => console.log(res.data.result.files.image[0].name))
             .catch((err) => console.log(err));
      }
      
      axios.put(`http://localhost:3000/api/recipes/${updatedRecipe[0].id}?access_token=` + this.token, updatedRecipe[0])
      .then((res) => {
        let index = updatedRecipe[2]
        this.recipes = Object.assign(this.recipes, this.recipes, {[index]: res.data})
      })
      .catch(err => console.log(err));
      // console.log(updatedRecipe);
    },

    searchFilter(word){
      // this.search = word;
      if(word !== ''){
        axios.get(`http://localhost:3000/api/recipes/search?name=${word}&access_token=` + this.token)
              .then((res) => this.recipes = res.data.recipe)
              .catch(err => console.log(err));
      }else{
        axios.get('http://localhost:3000/api/recipes')
        .then(res => this.recipes = res.data)
        .catch(err => console.log(err));
      }
    },
    filterByCategory(category){
        axios.get(`http://localhost:3000/api/recipes/sort?category=${category}&access_token=` + this.token)
              .then((res) => this.recipes = res.data.recipe)
              .catch(err => console.log(err));
    },
    removeFilterByCategory(){
          axios.get('http://localhost:3000/api/recipes')
            .then(res => this.recipes = res.data)
            .catch(err => console.log(err));
    },

    checkToken(loginToken){
        this.token = loginToken;
    }
  },
  computed:{
    filteredRecipes(){
      return this.recipes.filter((recipe) => {
        return recipe.name.toLowerCase().startsWith(this.search.toLowerCase()) 
      });
    }
  },
  created() {
      axios.get('http://localhost:3000/api/recipes')
      .then(res => this.recipes = res.data)
      .catch(err => console.log(err));

  }
}
</script>

<style>
  * {
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family:   "Open Sans", Arial, Helvetica, sans-serif !important;
    line-height: 1.4;
  }

  .recipeHeading {
    font-family: "Cormonrant Garamond";
  }

  .greenColor {
    color: #76E132;
  }

  .greenColor:hover, .greenColor:active, .greenColor:visited{
    color: #4CAF50;
    text-decoration: none;
  }
  
  
</style>
