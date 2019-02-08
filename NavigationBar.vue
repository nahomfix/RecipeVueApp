<template>
<div>
  <v-toolbar dark color="green" @check-token="HomePage"> 
    <v-toolbar-title class="white--text"><router-link to='/' class="whiteTitleLink">Foods</router-link></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-text-field solo-inverted v-model="grabWord" @keyup="grabWordd" append-icon="search" color="green" class="spacing" flat></v-text-field>
    <!-- <v-btn icon @click="show = !show">
      <v-icon>search</v-icon>
    </v-btn> -->
    <router-link to='/signup' class="whiteLink" style="margin-right:15px;" v-if="!token">Sign Up</router-link>
    <router-link to='/login' class="whiteLink" v-if="!token">Login</router-link>
    <button class="whiteLink" v-if="token" @click="logoutUser">Logout</button>
  </v-toolbar>
</div>
</template>

<script>
import axios from 'axios';

/* eslint-disable */

export default {
    name: "navBar",
    props: ['recipes', 'passedToken'],
    data(){
        return{
            show: false,
            grabWord: ''.trim(),
            initialResults: [],
            reset: 'reset',
            searchResults: [],
            token: this.passedToken
        }
    },
    watch:{
    //    token: function(newVal, oldVal){
    //        console.log("new " + newVal, "new " + oldVal);
    //    }
    },
    methods: {
        grabWordd(){
            // console.log(this.recipes);
            // let reslist = this.queriedResults.filter((singleRecipe) => singleRecipe.indexOf(this.grabWord.toLowerCase()) !== -1); 
            // console.log(reslist);
            // this.initialResults = this.recipes;
            // console.log(this.initialResults);
            // let search = this.recipes.filter((singleRecipe) => singleRecipe.name.toString().toLowerCase().startsWith(this.grabWord.toString().toLowerCase()));
            // console.log(search);
            // this.searchResults = this.recipes.filter((singleRecipe) => singleRecipe.name.toString().toLowerCase().startsWith(this.grabWord.toString().toLowerCase()));
            // if (this.grabWord === ''){
            //     this.$emit('search-result', this.reset);
            //     console.log("INITIAL " , this.reset);
            // }else{
            //     this.$emit('search-result', this.searchResults);
            //     console.log("SEARCH  " , this.searchResults);
            // }

            this.$emit('searchWord', this.grabWord);

            

            
        },
        logoutUser(){
            localStorage.clear();

            axios.post('http://localhost:3000/api/Users/logout?access_token=' + this.token)
                .then((res) => this.token = res.data)
                .catch((err) => console.log(err));

            // this.$router.replace('/');
            // this.$router.go();
        },
        HomePage(localToken){
            this.token = localToken;
        }

    },
    computed:{
         queriedSearchResults(){
            //  let searchResults = [];
                // if (this.recipes[i].name.toString().toLowerCase().startsWith(this.grabWord.toString().toLowerCase())){
                //     searchResults.push(this.recipes[i]);
                // }
                
            // return searchResults;
         }
        
    },
    created(){
        // this.queriedResults = this.recipes;
        // console.log(this.recipes);
        // console.log(this.token);
         
    }


}
</script>

<style scoped>
    .whiteLink, .whiteTitleLink{
        color: white;
        text-decoration: none;
    }

    .whiteLink:hover{
        color: #ccc;
    }

    .auth{
        display: inline-block;
    }

    .spacing{
        margin-top: 5px !important;
        margin-right: 40px !important;
        max-width: 550px; 
    }
    
</style>
