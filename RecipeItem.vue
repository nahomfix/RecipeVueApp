<template>
    <div>
        <!-- <v-container fluid grid-list-md>
            <v-layout row nowrap>
             <v-flex>
                    <v-card>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
                        <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{recipe.name}}</h3>
                            <div>{{recipe.description}}</div>
                        </div>
                        </v-card-title>

                        <v-card-actions>
                        <v-btn flat color="light-green accent-4">Read More...</v-btn>
                        <router-link :to="'/recipes/' + id">this link</router-link>
                        </v-card-actions>
                    </v-card>
             </v-flex>
            </v-layout>
        </v-container> -->
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" :src="require('../../BACKEND/recipe/server/storage/photos/' + recipe.photoName)"  :alt="photoName">
            <div class="card-body">
                <h5 class="card-title">{{recipe.name}}</h5>
                <p class="card-text" style="height:30px; overflow:hidden;">{{recipe.description}}</p>
                <router-link :to="'/recipes/' + id" class="greenColor" :key="id">Read More...</router-link>
                <a href="javascript:void(0)" class="greenColor category" @click="sortByCat">{{recipe.category}}</a>
             </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "recipeItem",
    props: ['recipe', 'id'],
    data() {
        return {

        }
    },
    watch: {
        
    },
    methods: {
        sortByCat(){
            this.$emit('sort-by-category', this.recipe.category)
        }
        
    },
    created(){
        
    }
}
</script>

<style scoped>
        /* background-color: #7BE85C; */
        /* background-color: #76FF03; */
        /* color: white;
        padding: 5px 15px; */

    .card{
        margin-right: 30px;
        margin-bottom: 30px;
    }

    .category {
        float:right; 
        text-transform: uppercase; 
        background-color: #BBF099;
        color: #4CAF50;
        padding: 0 5px;
        border-radius: 3px;
        margin-right: 5px;
    }

    .category:hover{
        color: black;
    }
</style>
