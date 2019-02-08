<template>
    <div>
        <div class="loginBox">
            <img :src="avatar" class="user"/>
            <h4>Sign Up</h4>
                <label for="username">Username:</label><input id="user_name" type="text" class="form-control" v-model='username' name="username">
                <label for="email">Email:</label><input id="email" type="text" class="form-control" v-model='email' name='email'>
                <label for="password">Password:</label><input id="password" type="password" class="form-control" v-model='password' name="password">
                <div class="loginBtn text-center">
                    <button class="btn light-green accent-4" name="action" @click="submitUser">Sign Up</button>
                </div>
                <div class="text-center">
                <span>Already have an account?&nbsp;</span><router-link to="/login" class="greenColor">Sign In</router-link>
                </div>
        </div>
    </div>
</template>

<script>
import Avatar from '../assets/avatar-form.png';
import axios from 'axios';

/* eslint-disable */

export default {
    name: "SignupPage",
    data(){
        return{
            avatar: Avatar,
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        submitUser(){
            let user = {
                "username": this.username,
                "email": this.email,
                "password": this.password
            }

            axios.post('http://localhost:3000/api/Users', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
            
            // console.log(user);
        }
    }
}
</script>

<style scoped>
.loginBox{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 350px;
    height: 500px;
    box-sizing: border-box;
    background: rgba(0,0, 0, 0.1);
    padding: 80px 40px;
    border-radius: 10px;

}

.user{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: -50px;
    left: 125px;
}

h4{
    margin: 0;
    padding: 0 0 20px;
    text-align: center; 
}

.loginBox input{
    margin-bottom: 30px;
}
.loginBtn{
    /* margin-left: 100px; */
    margin-bottom: 25px;
    
}

button{
    color: white;
}

input{
    background-color: white;
}
</style>
