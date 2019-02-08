<template>
    <v-dialog v-model="dialogOpen" max-width="500px">
          <v-card>
            <v-card-text>
              <v-text-field label="Add a title..." :value="recipe.name" v-model="updatedRecipe.name"></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-textarea label="Add a description..." :value="recipe.description" v-model="updatedRecipe.description"></v-textarea>
            </v-card-text>
            <v-card-text class="text-center">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Breakfast" :checked="radioCheck1" v-model="updatedRecipe.category">
                    <label class="form-check-label" for="inlineRadio1">Breakfast</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Lunch" :checked="radioCheck2" v-model="updatedRecipe.category">
                    <label class="form-check-label" for="inlineRadio2">Lunch</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Dinner" :checked="radioCheck3" v-model="updatedRecipe.category">
                    <label class="form-check-label" for="inlineRadio3">Dinner</label>
                </div>
            </v-card-text>
            <v-card-text>
            <input type="file" ref="file" accept="image/*" @change="onFileSelected">
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark class="light-green accent-4" v-on:click="submitEdit(updatedRecipe)">Done</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
</template>

<script>
export default {
    name: "EditRecipe",
    props: ['dialogOpen', 'recipe', 'recipeIndex'],
    data(){
        return{
            selectedFile: null,
            updatedRecipe: {
                id: this.recipe.id,
                name: this.recipe.name,
                description: this.recipe.description,
                category: this.recipe.category,
                ingredients: ['Bread', 'Meat'],
                photo: this.recipe.photo,
                photoName: this.recipe.photoName

             }
        }
    },
    watch:{
        
    },
    methods:{
        submitEdit(editedRecipe){
            // this.recipe = this.updatedRecipe;
            // 
            if (this.selectedFile != null){
                let formData = new FormData();
                formData.append('image', this.selectedFile, this.selectedFile.name);
                editedRecipe.photo = formData;
                // console.log(editedRecipe.photoName);
            }

            // console.log(editedRecipe);
            let compareRecipe = [editedRecipe, this.recipe, this.recipeIndex];
            // console.log(compareRecipe[0].id);

            this.$emit('submit-edit', compareRecipe);

            this.dialogOpen = false;

        },

        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            this.updatedRecipe.photoName = this.selectedFile.name;

            // console.log(this.updatedRecipe.photoName);
        }
    },
    computed: {
        radioCheck1(){
            return this.recipe.category.toLowerCase() == "breakfast"
        },
        radioCheck2(){
            return this.recipe.category.toLowerCase() == "lunch"
        },
        radioCheck3(){
            return this.recipe.category.toLowerCase() == "dinner"
        }
    }

}
</script>

<style>

</style>
