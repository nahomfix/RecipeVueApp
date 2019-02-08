<template>
    <div>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-text-field label="Add a title..." v-model="newRecipe.name"></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-textarea label="Add a description..." v-model="newRecipe.description"></v-textarea>
            </v-card-text>
            <v-card-text class="text-center">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Breakfast" v-model="newRecipe.category">
                    <label class="form-check-label" for="inlineRadio1">Breakfast</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Lunch" v-model="newRecipe.category">
                    <label class="form-check-label" for="inlineRadio2">Lunch</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Dinner" v-model="newRecipe.category">
                    <label class="form-check-label" for="inlineRadio3">Dinner</label>
                </div>
            </v-card-text>
            <v-card-text>
            <input type="file" ref="file" accept="image/*" @change="onFileSelected">
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark class="light-green accent-4" @click="dialog = false" v-on:click="submitRecipe">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Floating Button -->

        <v-btn dark fab absolute right bottom class="light-green accent-4 fabPosition" @click="dialog = !dialog">
            <v-icon>add</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'AddRecipe',
    data(){
        return{
            dialog: false,
            selectedFile: null,
            title: '',
            description: '',
            photo: '',
            newRecipe: {
                name: '',
                description: '',
                category: '',
                photo: null,
                photoName: ''
            }
        }
    },
    methods: {
        submitRecipe(){
            // console.log("Hello");
            // console.log(this.title + " " + this.description + " " + this.imagePath)
            let formData = new FormData();
            formData.append('image', this.selectedFile, this.selectedFile.name);
            this.newRecipe.photo = formData;
            // console.log(this.newRecipe.photo);
            // console.log(this.photo);
            if(this.newRecipe.name != '' && this.newRecipe.description !== ''){
                this.$emit('add-recipe', this.newRecipe);
            }

        },

        PhotoUpload(){
            this.photo = this.$refs.file.files[0];
        },
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            this.newRecipe.photoName = this.selectedFile.name;
        }
    }
}
</script>

<style>
    .fabPosition{
        top: 80%;
    }
</style>
