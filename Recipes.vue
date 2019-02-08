<template>
    <div>
        <!-- <v-btn dark class="light-green accent-4" @click="newInputed">New Recipe</v-btn> -->
        <!-- <v-container fluid grid-list-md> -->
            <!-- <v-layout row wrap> -->
        <div class="container">
            <v-snackbar :value="alertSuccess" :timeout="3000" :top="true" color="green darken-2">Successfully Deleted.</v-snackbar>
            <div v-if="closeChip">
                Sorted By: <v-chip close color="#BBF099" text-color="#4CAF50" v-model="closeChip" @input="removeCategory">{{sortCategory}}</v-chip>
                <hr>
            </div>
            <div class="row">
                <RecipeItem v-for="(recipe, index) in recipes" v-bind:recipe="recipe" v-bind:key="index" v-bind:id="index" @sort-by-category="sortByCategory"/>
            </div>
        </div>
        <AddRecipe v-on:add-recipe="addNewRecipe" v-if="token"/>
            <!-- </v-layout> -->
        <!-- </v-container> -->
    </div>
</template>

<script>

import RecipeItem from './RecipeItem.vue';
import AddRecipe from './AddRecipe.vue';
// import axios from 'axios';

export default {
    name: "recipes",
    props: ['recipes', 'alertSuccess'],
    components: {
        RecipeItem,
        AddRecipe
    },
    data() {
        return {
            closeChip: false,
            newInput: false,
            sortCategory: '',
            token: localStorage.getItem('token')
        }
    },
    watch: {
        
    },
    methods: {
        newInputed(){
            this.newInput = !this.newInput;
        },

        addNewRecipe(newRecipe){
            // let newRec = {
            //     name: newRecipe.title,
            //     description: newRecipe.description,
            //     category: newRecipe.category,
            //     ingredients: ["1","3","5"]
            // }

            // axios.post('http://localhost:3000/api/recipes', newRec)
            //  .then(res => this.recipes = [...this.recipes, res.data])
            //  .catch(err => console.log(err));

            this.$emit('add-new-recipe', newRecipe);

            // console.log(newRec);

            // this.recipes.push(newRec);
        },

        sortByCategory(category){
            this.sortCategory = category;
            // console.log(this.sortCategory);
            // this.filteredRecipes = this.recipes.filter((recipe) => recipe.category == category);
            this.closeChip = true;
            this.$emit("sort-by-category", category);
        },
        removeCategory(){
            this.sortCategory = '';
            // this.filteredRecipes = this.recipes;
            this.$emit('remove-category');
        }
    },
    computed:{
        sortedRecipes(){
            return this.recipes.filter((recipe) => {
                return (recipe.category.toLowerCase().startsWith(this.sortCategory.toLowerCase()))
            });
        }
    },
    created(){
        this.onhomepage = true;
        this.$emit('on-home-page', localStorage.getItem('token'));

        this.token = localStorage.getItem('token');
    }

}
</script>

<style scoped>


</style>