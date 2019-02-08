<template>
    <div>
        <EditRecipe :dialogOpen="dialog" :recipe="recipes[recipeId]" @submit-edit="submittedEdit" :recipeIndex="recipeId"/>
        <div class="container mt-5 panel">

             <div class="writing">
                 <div class="heading">
                     {{recipes[recipeId].name}}
                 </div>
                 <div class="desc">
                    <!-- Id:- {{recipeId}}  -->
                    <strong>Description:- {{recipes[recipeId].description}}</strong>

                    <div class="buttons">
                    <button class="btn btn-info" style="color:white; margin-right: 10px;" @click="dialog = true" v-if="token">Edit</button>
                    <!-- <button class="btn btn-danger" @click="deleteRecipe(recipes[recipeId].id)">Delete</button> -->
                    <button class="btn btn-danger" @click="deleteDialog = true" v-if="token">Delete</button>
                    </div>
                 </div>
             </div>
            <div class="panelImage">
                <img :src="require('../../BACKEND/recipe/server/storage/photos/' + recipes[recipeId].photoName)"/>
            </div>
            <v-dialog v-model="deleteDialog" persistent max-width="500">
                <v-card>
                    <v-card-title class="headline">Confirm Delete</v-card-title>
                    <v-card-text>Are you sure you want to delete this recipe?</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="deleteDialog = false">Cancel</v-btn>
                    <v-btn color="red darken-3" flat @click="deleteDialog = false" v-on:click="deleteRecipe(recipes[recipeId].id)">I'm sure</v-btn>
                    </v-card-actions>
                </v-card>
             </v-dialog>
        </div>
    </div>
</template>

<script>
import imagePath from '../assets/hero.jpg';
import EditRecipe from './EditRecipe.vue';
// import axios from 'axios';

export default {
    name: "RecipeDetails",
    props: ["recipes", "id"],
    components: {
        EditRecipe
    },
    data(){
        return{
            token: localStorage.getItem('token'),
            dialog: false,
            deleteDialog: false,
            recipeId: this.$route.params.recipeId,
            imagePath 
        }
    },
    watch:{
        "$route":"refreshId"
    },
    methods: {
        refreshId(){
            this.recipeId = this.$route.params.recipeId;
        },

        deleteRecipe(id){
            // this.recipes.splice(this.recipeId, 1);
            
            // alert("Successfully deleted");



            this.$emit('delete-recipe', id);

            this.$router.push('/');
        },
        submittedEdit(editedRecipe){
            // this.recipe = this.updatedRecipe;
            // 

            // console.log(editedRecipe);
            // console.log(compareRecipe);

            this.$emit('submit-edit', editedRecipe);

        }
    }
}
</script>

<style>
    .panel {
        box-shadow: 0px 0px 20px #ccc;
        display: flex;
        height: 550px;
        width: 1000px;
        position: relative;
    }

    .panelImage{
        /* background-image: url(); */
        /* background-position: cover; */
        /* height: 550px; */
        /* width:  1000px; */
        flex: 2;
        flex-basis: 70%;
    }
    img{
        width: 100%;
        height: 100%;
    }

    .heading {
        font-family: Didot;
        font-size: 250%;
        overflow-wrap: break-word;
        /* width: 300px; */
        /* height: 80px; */
    }

    .desc {
        color: #999;
        overflow-wrap: break-word;
        height: 300px;
    }

    .writing{
        /* width: 550px; */
        flex: 1;
        flex-basis: 40%;
        overflow: hidden;
    }

    .buttons{
        position: absolute;
        bottom: 30px;
    }

</style>
